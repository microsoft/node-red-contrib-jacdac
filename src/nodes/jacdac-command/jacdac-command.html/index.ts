import { EditorRED } from "node-red";
import {
  renderCommandFilter,
  renderDeviceFilter,
  renderServiceFilter,
} from "../../shared/renderfilters";
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
    command: { value: "", required: true },
  },
  inputs: 1,
  outputs: 0,
  icon: "jacdac-command.png",
  paletteLabel: "jacdac cmd",
  label: function () {
    if (this.name) return this.name;
    return (
      "jacdac cmd " +
      [
        renderDeviceFilter(this),
        renderServiceFilter(this),
        renderCommandFilter(this),
      ].join(":")
    );
  },
});
