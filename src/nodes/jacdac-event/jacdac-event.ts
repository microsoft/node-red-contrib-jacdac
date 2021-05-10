import { NodeInitializer } from "node-red";
import { JacdacEventNode, JacdacEventNodeDef } from "./modules/types";
import { bus } from "../shared/bus"
import { CONNECT, CONNECTION_STATE, DEVICE_ANNOUNCE, EVENT, JDDevice, JDEvent, JDService } from "jacdac-ts";

const nodeInit: NodeInitializer = (RED): void => {
  function JacdacEventNodeConstructor(
    this: JacdacEventNode,
    config: JacdacEventNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    const { device: deviceFilter, service: serviceFilter, event: eventFilter } = config
    this.log(`create node ${deviceFilter}:${serviceFilter}:${eventFilter}`)

    const updateStatus = () => {
      this.log(`connection: ${bus.connected ? "connected" : "disconnected"}`)
      this.status(bus.connected ? { fill: "green", shape: "dot", text: "connected" }
        : { fill: "red", shape: "ring" })
    }

    const filterDevice = (dev: JDDevice) => bus.selfDevice !== dev &&
      (!deviceFilter
        || deviceFilter.toLocaleLowerCase() === dev.deviceId.toLocaleLowerCase()
        || deviceFilter.toLocaleLowerCase() === dev.shortId.toLocaleLowerCase())

    const filterService = (srv: JDService) => !serviceFilter
      || srv.serviceClass === parseInt(serviceFilter, 16)
      || (srv.name && srv.name.toLocaleLowerCase() === serviceFilter.toLocaleLowerCase())

    const filterEvent = (evt: JDEvent) => !eventFilter
      || evt.code === parseInt(eventFilter, 16)
      || (evt.name && evt.name.toLocaleLowerCase() === eventFilter.toLocaleLowerCase())

    const registerDevice = (dev: JDDevice) => {
      this.log(`registering device ${dev}`)
      if (filterDevice(dev)) {
        // register events
        for (const srv of dev.services().filter(filterService)) {
          for (const evt of srv.events.filter(filterEvent)) {
            this.log(`registering event ${evt}`)
            evt.on(EVENT, () => {
              this.debug(`event ${evt}`)
              this.send({
                payload: {
                  deviceId: dev.deviceId,
                  deviceShortId: dev.shortId,
                  serviceIndex: srv.serviceIndex,
                  serviceClass: srv.serviceClass,
                  serviceName: srv.name,
                  eventCode: evt.code,
                  eventName: evt.name,
                  data: evt.data
                }
              })
            })
          }
        }
      }
    }

    const registerAllDevices = () => {
      for (const dev of bus.devices({ ignoreSelf: true }))
        registerDevice(dev)
    }

    bus.on(CONNECTION_STATE, updateStatus)
    bus.on(DEVICE_ANNOUNCE, registerDevice)
    bus.on(CONNECT, registerAllDevices)

    updateStatus()
    registerAllDevices()
    bus.connect()
  }

  RED.nodes.registerType("jacdac-event", JacdacEventNodeConstructor);
};

export = nodeInit;
