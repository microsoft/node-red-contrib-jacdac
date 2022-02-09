import { Node } from "node-red"
import {
    JDBus,
    CONNECTION_STATE,
    JDDevice,
    DEVICE_ANNOUNCE,
    CONNECT,
    createNodeUSBOptions,
    Transport,
    createUSBTransport,
    createNodeWebSerialTransport,
    createNodeSPITransport,
} from "jacdac-ts"

function tryRequire(id: string) {
    try {
        return require(id)
    } catch (e) {
        return undefined
    }
}

const rpio = tryRequire("rpio")
const usb = tryRequire("usb")
const serialport = tryRequire("serialport")

const transports: Transport[] = [
    rpio && createNodeSPITransport(rpio),
    usb && createUSBTransport(createNodeUSBOptions(usb.WebUSB)),
    serialport && createNodeWebSerialTransport(serialport),
]
export const bus = new JDBus(transports, {
    client: false,
    disableRoleManager: true,
})

export function connectStatus(node: Node) {
    const updateStatus = () => {
        node.log(`connection: ${bus.connected ? "connected" : "disconnected"}`)
        node.log(`transports: ${bus.transports.map(tr => `${tr.type}: ${tr.connectionState}`)}`)
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
