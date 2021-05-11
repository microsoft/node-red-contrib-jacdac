import { EditorRED } from "node-red";
import { JacdacReadingEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<JacdacReadingEditorNodeProperties>("jacdac-reading", {
  category: "function",
  color: "#DEBD5C",
  defaults: {
    name: { value: "" },
    device: { value: "" },
    service: { value: "" },
    serviceIndex: { value: undefined },
    serviceInstanceName: { value: undefined },
    register: { value: "" },
    updates: { value: true }
  },
  inputs: 0,
  outputs: 1,
  icon: "jacdac-reading.png",
  paletteLabel: "jacdac read",
  label: function () {
    return this.name || "jacdac read";
  },
});