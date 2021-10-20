import { EditorRED } from "node-red"
import {
    renderDeviceFilter,
    renderEventFilter,
    renderServiceFilter,
} from "../../shared/renderfilters"
import { JacdacEventEditorNodeProperties } from "./modules/types"

declare const RED: EditorRED

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
        connection: { value: "", type: "jacdac-config" },
    },
    inputs: 0,
    outputs: 1,
    icon: "jacdac-event.png",
    paletteLabel: "jacdac event",
    label: function () {
        if (this.name) return this.name
        return (
            "jacdac event " +
            [
                renderDeviceFilter(this),
                renderServiceFilter(this),
                renderEventFilter(this),
            ].join(":")
        )
    },
})
