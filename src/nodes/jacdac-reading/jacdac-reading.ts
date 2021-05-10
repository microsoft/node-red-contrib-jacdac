import { JDDevice, REPORT_RECEIVE } from "jacdac-ts";
import { NodeInitializer } from "node-red";
import { connectNode } from "../shared/bus";
import { createDeviceFilter, createRegisterFilter, createServiceFilter } from "../shared/filters";
import { JacdacReadingNode, JacdacReadingNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function JacdacReadingNodeConstructor(
    this: JacdacReadingNode,
    config: JacdacReadingNodeDef
  ): void {
    RED.nodes.createNode(this, config);


    const filterDevice = createDeviceFilter(config)
    const filterService = createServiceFilter(config)
    const filterRegister = createRegisterFilter(config)

    const registerDevice = (dev: JDDevice) => {
      this.log(`registering device ${dev}`)
      if (filterDevice(dev)) {
        for (const srv of dev.services().filter(filterService)) {
          for (const reg of srv.registers().filter(filterRegister)) {
            this.log(`registering register ${reg}`)
            reg.on(REPORT_RECEIVE, () => {
              this.debug(`report ${reg}`)
              this.send({
                payload: {
                  deviceId: dev.deviceId,
                  deviceShortId: dev.shortId,
                  serviceIndex: srv.serviceIndex,
                  serviceClass: srv.serviceClass,
                  serviceName: srv.name,
                  eventCode: reg.code,
                  eventName: reg.name,
                  data: reg.unpackedValue
                }
              })
            })
          }
        }
      }
    }

    // we need to make sure that devices are streaming

    connectNode(this, registerDevice)
  }

  RED.nodes.registerType("jacdac-reading", JacdacReadingNodeConstructor);
};

export = nodeInit;
