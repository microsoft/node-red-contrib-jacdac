import { Node } from "node-red";
import { createUSBTransport, createNodeUSBOptions, JDBus, CONNECTION_STATE, JDDevice, DEVICE_ANNOUNCE, CONNECT } from "jacdac-ts"

const opts = createNodeUSBOptions()
const transport = createUSBTransport(opts)
export const bus = new JDBus([transport])


export function connectNode(node: Node, registerDevice: (dev: JDDevice) => void) {
    const registerAllDevices = () => {
        for (const dev of bus.devices({ ignoreSelf: true }))
            registerDevice(dev)
    }
    const updateStatus = () => {
        node.log(`connection: ${bus.connected ? "connected" : "disconnected"}`)
        node.status(bus.connected ? { fill: "green", shape: "dot", text: "connected" }
            : { fill: "red", shape: "ring" })
    }

    bus.on(DEVICE_ANNOUNCE, registerDevice)
    bus.on(CONNECT, registerAllDevices)
    bus.on(CONNECTION_STATE, updateStatus)

    registerAllDevices()
    updateStatus()

    bus.connect()
}

