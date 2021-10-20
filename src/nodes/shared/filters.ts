import { JDDevice, JDEvent, JDRegister, JDService, SystemReg } from "jacdac-ts"
import { bus } from "./bus"
import {
    JacdacCommandFilterOptions,
    JacdacDeviceFilterOptions,
    JacdacEventFilterOptions,
    JacdacRegisterFilterOptions,
    JacdacServiceFilterOptions,
} from "./types"

export function createDeviceFilter(options: JacdacDeviceFilterOptions) {
    const { device } = options
    return (dev: JDDevice) =>
        bus.selfDevice !== dev &&
        (!device ||
            device.toLocaleLowerCase() === dev.deviceId.toLocaleLowerCase() ||
            device.toLocaleLowerCase() === dev.shortId.toLocaleLowerCase())
}

export function createServiceFilter(options: JacdacServiceFilterOptions) {
    const { service, serviceIndex, serviceInstanceName } = options

    const instanceNameRx = serviceInstanceName
        ? new RegExp(serviceInstanceName, "i")
        : undefined
    return (srv: JDService) =>
        (!service ||
            srv.serviceClass === parseInt(service, 16) ||
            (srv.name &&
                srv.name.toLocaleLowerCase() ===
                    service.toLocaleLowerCase())) &&
        (serviceIndex === undefined || serviceIndex == srv.serviceIndex) &&
        (!instanceNameRx || instanceNameRx.test(srv.instanceName))
}

export function createEventFilter(options: JacdacEventFilterOptions) {
    const { event } = options
    return (evt: JDEvent) =>
        !event ||
        evt.code === parseInt(event, 16) ||
        (evt.name && evt.name.toLocaleLowerCase() === event.toLocaleLowerCase())
}

const defaultRegisters = [
    SystemReg.Reading,
    SystemReg.Value,
    SystemReg.Intensity,
]

export function createRegisterFilter(options: JacdacRegisterFilterOptions) {
    const { register } = options
    return (reg: JDRegister) =>
        (!register && defaultRegisters.indexOf(reg.code) > -1) ||
        (register && reg.code === parseInt(register, 16)) ||
        (register &&
            reg.name &&
            reg.name.toLocaleLowerCase() === register.toLocaleLowerCase())
}

export function createCommandFilter(options: JacdacCommandFilterOptions) {
    const { command } = options
    return (srv: JDService) => {
        const { specification } = srv
        const code = parseInt(command, 16)
        return specification?.packets.find(
            pkt =>
                (pkt.kind === "command" &&
                    pkt.name.toLocaleLowerCase() ===
                        command.toLocaleLowerCase()) ||
                pkt.identifier === code
        )
    }
}
