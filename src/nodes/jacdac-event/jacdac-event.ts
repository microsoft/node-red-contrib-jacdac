import { NodeInitializer } from "node-red";
import { JacdacEventNode, JacdacEventNodeDef } from "./modules/types";
import { connectNode } from "../shared/bus"
import { EVENT, JDDevice } from "jacdac-ts";
import { createDeviceFilter, createEventFilter, createServiceFilter } from "../shared/filters";

const nodeInit: NodeInitializer = (RED): void => {
  function JacdacEventNodeConstructor(
    this: JacdacEventNode,
    config: JacdacEventNodeDef
  ): void {
    RED.nodes.createNode(this, config)

    const filterDevice = createDeviceFilter(config)
    const filterService = createServiceFilter(config)
    const filterEvent = createEventFilter(config)

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
                  serviceInstanceName: srv.register
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
    connectNode(this, registerDevice)
  }

  RED.nodes.registerType("jacdac-event", JacdacEventNodeConstructor);
};

export = nodeInit;
