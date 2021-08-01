import { NodeInitializer } from "node-red"
import { JacdacEventNode, JacdacEventNodeDef } from "./modules/types"
import { cleanPayload, connectNode } from "../shared/bus"
import { EVENT, JDDevice, JDEvent } from "jacdac-ts"
import {
    createDeviceFilter,
    createEventFilter,
    createServiceFilter,
} from "../shared/filters"

const nodeInit: NodeInitializer = (RED): void => {
    function JacdacEventNodeConstructor(
        this: JacdacEventNode,
        config: JacdacEventNodeDef
    ): void {
        RED.nodes.createNode(this, config)

        const filterDevice = createDeviceFilter(config)
        const filterService = createServiceFilter(config)
        const filterEvent = createEventFilter(config)

        const sendEvent = (evt: JDEvent) => {
            const { service } = evt
            const { device } = service
            this.debug(`event ${evt}`)
            this.send({
                payload: cleanPayload({
                    deviceId: device.deviceId,
                    deviceShortId: device.shortId,
                    serviceIndex: service.serviceIndex,
                    serviceInstanceName: service.instanceName,
                    serviceName: service.name,
                    eventCode: evt.code,
                    eventName: evt.name,
                    data: evt.data,
                }),
            })
        }

        const registerDevice = (dev: JDDevice) => {
            if (!filterDevice(dev)) return

            this.log(`registering device ${dev}`)
            for (const srv of dev.services().filter(filterService)) {
                for (const evt of srv.events.filter(filterEvent)) {
                    this.log(`registering event ${evt}`)
                    evt.on(EVENT, sendEvent)
                }
            }
        }
        connectNode(this, registerDevice)
    }

    RED.nodes.registerType("jacdac-event", JacdacEventNodeConstructor)
}

export = nodeInit
