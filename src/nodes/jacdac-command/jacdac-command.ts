import { jdpack, objectToUnpacked } from "jacdac-ts";
import { NodeInitializer } from "node-red";
import { bus, connectStatus } from "../shared/bus";
import {
  createCommandFilter,
  createDeviceFilter,
  createServiceFilter,
} from "../shared/filters";
import { JacdacCommandNode, JacdacCommandNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function JacdacCommandNodeConstructor(
    this: JacdacCommandNode,
    config: JacdacCommandNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    const filterDevice = createDeviceFilter(config);
    const filterService = createServiceFilter(config);
    const filterCommand = createCommandFilter(config);

    this.on("input", async (msg, send, done) => {
      const { payload } = msg;

      for (const dev of bus
        .devices({ ignoreSelf: true, announced: true })
        .filter(filterDevice)) {
        for (const srv of dev
          .services({ specification: true })
          .filter(filterService)) {
          const cmd = filterCommand(srv);
          if (cmd?.packFormat) {
            const unpacked = objectToUnpacked(cmd, payload);
            const data = jdpack(cmd.packFormat, unpacked);
            await srv.sendCmdAsync(cmd.identifier, data);
          }
        }
      }
      done();
    });

    connectStatus(this);
  }

  RED.nodes.registerType("jacdac-command", JacdacCommandNodeConstructor);
};

export = nodeInit;
