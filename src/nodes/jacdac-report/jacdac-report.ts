import { JDDevice, JDRegister, REPORT_RECEIVE, REPORT_UPDATE } from "jacdac-ts";
import { NodeInitializer } from "node-red";
import { cleanPayload, connectNode } from "../shared/bus";
import {
  createDeviceFilter,
  createRegisterFilter,
  createServiceFilter,
} from "../shared/filters";
import { JacdacReportNode, JacdacReportNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function JacdacReportNodeConstructor(
    this: JacdacReportNode,
    config: JacdacReportNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    const filterDevice = createDeviceFilter(config);
    const filterService = createServiceFilter(config);
    const filterRegister = createRegisterFilter(config);

    const sendRegister = (reg: JDRegister) => {
      const { service: srv } = reg;
      const { device: dev } = srv;
      this.send({
        payload: cleanPayload({
          data: reg.objectValue,
          deviceShortId: dev.shortId,
          serviceIndex: srv.serviceIndex,
          serviceName: srv.name,
          registerName: reg.name,

          // low-level info
          deviceId: dev.deviceId,
          serviceClass: srv.serviceClass,
          registerCode: reg.code,
        }),
      });
    };

    const { updates } = config;
    const reportEvent = updates ? REPORT_UPDATE : REPORT_RECEIVE;

    const registerDevice = (dev: JDDevice) => {
      this.log(`registering device ${dev}`);
      if (filterDevice(dev)) {
        for (const srv of dev.services().filter(filterService)) {
          this.log(`scanning service ${srv.name}`);
          for (const reg of srv.registers().filter(filterRegister)) {
            this.log(`registering register ${reg.name}`);
            // register this register will automatically
            // automatically have the bus
            // refresh its value
            reg.on(reportEvent, sendRegister);
          }
        }
      }
    };

    connectNode(this, registerDevice);
  }

  RED.nodes.registerType("jacdac-report", JacdacReportNodeConstructor);
};

export = nodeInit;
