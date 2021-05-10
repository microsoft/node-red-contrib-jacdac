import { JDDevice, REPORT_UPDATE } from "jacdac-ts";
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
            // register this register will automatically automatically have the bus
            // refresh its value
            reg.on(REPORT_UPDATE, () => {
              this.send({
                payload: {
                  data: reg.unpackedValue,
                  deviceShortId: dev.shortId,
                  serviceIndex: srv.serviceIndex,
                  serviceName: srv.name,
                  registerName: reg.name,

                  // low-level info
                  deviceId: dev.deviceId,
                  serviceClass: srv.serviceClass,
                  registerCode: reg.code,
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
