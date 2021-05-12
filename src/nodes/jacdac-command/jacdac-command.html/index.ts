import { EditorRED } from "node-red";
import { JacdacCommandEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<JacdacCommandEditorNodeProperties>("jacdac-command", {
  category: "function",
  color: "#DEBD5C",
  defaults: {
    name: { value: "" },
    device: { value: "" },
    service: { value: "", required: true },
    serviceIndex: { value: undefined },
    serviceInstanceName: { value: undefined },
    command: { value: "", required: true }
  },
  inputs: 1,
  outputs: 0,
  icon: "jacdac-command.png",
  paletteLabel: "jacdac cmd",
  label: function () {
    return this.name || "jacdac cmd";
  },
});
