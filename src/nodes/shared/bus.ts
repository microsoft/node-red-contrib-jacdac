import { Node } from "node-red"
import {
    createUSBTransport,
    createNodeUSBOptions,
    JDBus,
    CONNECTION_STATE,
    JDDevice,
    DEVICE_ANNOUNCE,
    CONNECT,
} from "jacdac-ts"

const opts = createNodeUSBOptions()
const transport = createUSBTransport(opts)
export const bus = new JDBus([transport], { client: true })

export function connectStatus(node: Node) {
    const updateStatus = () => {
        node.log(`connection: ${bus.connected ? "connected" : "disconnected"}`)
        node.status(
            bus.connected
                ? { fill: "green", shape: "dot", text: "connected" }
                : { fill: "red", shape: "ring" }
        )
    }

    bus.on(CONNECTION_STATE, updateStatus)
    updateStatus()

    bus.connect()
}

export function connectNode(
    node: Node,
    registerDevice: (dev: JDDevice) => void
) {
    const registerAllDevices = () => {
        for (const dev of bus.devices({ ignoreInfrastructure: true }))
            registerDevice(dev)
    }

    bus.on(DEVICE_ANNOUNCE, registerDevice)
    bus.on(CONNECT, registerAllDevices)

    registerAllDevices()
    connectStatus(node)
}

export function cleanPayload(payload: any) {
    for (const key in payload) {
        if (payload[key] === undefined) delete payload[key]
    }
    return payload
}
