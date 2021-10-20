import { EditorRED } from "node-red"
import { JacdacConfigEditorNodeProperties } from "./modules/types"

declare const RED: EditorRED

RED.nodes.registerType<JacdacConfigEditorNodeProperties>("jacdac-config", {
    category: "config",
    defaults: {
        name: { value: "" },
        usb: { value: false },
        serial: { value: true },
    },
    icon: "jacdac-config.png",
    paletteLabel: "jacdac config",
    label: function () {
        return this.name || "jacdac config"
    },
})
