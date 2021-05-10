import { EditorRED } from "node-red";
import { JacdacEventEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<JacdacEventEditorNodeProperties>("jacdac-event", {
  category: "function",
  color: "#DEBD5C",
  defaults: {
    name: { value: "" },
    device: { value: "" },
    service: { value: "" },
    serviceIndex: { value: undefined },
    serviceInstanceName: { value: undefined },
    event: { value: "" },
  },
  inputs: 0,
  outputs: 1,
  icon: "jacdac-event.png",
  paletteLabel: "jacdac event",
  label: function () {
    return this.name || "jacdac event";
  },
});