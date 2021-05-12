import { EditorRED } from "node-red";
import { JacdacCommandEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<JacdacCommandEditorNodeProperties>("jacdac-command", {
  category: "function",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    service: { value: "", required: true },
    command: { value: "", required: true }
  },
  inputs: 1,
  outputs: 1,
  icon: "jacdac-command.png",
  paletteLabel: "jacdac command",
  label: function () {
    return this.name || "jacdac command";
  },
});
