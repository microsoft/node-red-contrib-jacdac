import { EditorRED } from "node-red";
import { JacdacReportEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<JacdacReportEditorNodeProperties>("jacdac-report", {
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
  icon: "jacdac-report.png",
  paletteLabel: "jacdac report",
  label: function () {
    return this.name || "jacdac report";
  },
});
