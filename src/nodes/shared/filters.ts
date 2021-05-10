import { JDDevice, JDEvent, JDRegister, JDService } from "jacdac-ts";
import { bus } from "./bus";
import { JacdacDeviceFilterOptions, JacdacEventFilterOptions, JacdacRegisterFilterOptions, JacdacServiceFilterOptions } from "./types"

export function createDeviceFilter(options: JacdacDeviceFilterOptions) {
    const { device } = options;
    return (dev: JDDevice) => bus.selfDevice !== dev &&
        (!device
            || device.toLocaleLowerCase() === dev.deviceId.toLocaleLowerCase()
            || device.toLocaleLowerCase() === dev.shortId.toLocaleLowerCase())
}

export function createServiceFilter(options: JacdacServiceFilterOptions) {
    const { service } = options
    return (srv: JDService) => !service
        || srv.serviceClass === parseInt(service, 16)
        || (srv.name && srv.name.toLocaleLowerCase() === service.toLocaleLowerCase())
}

export function createEventFilter(options: JacdacEventFilterOptions) {
    const { event } = options
    return (evt: JDEvent) => !event
        || evt.code === parseInt(event, 16)
        || (evt.name && evt.name.toLocaleLowerCase() === event.toLocaleLowerCase())
}

export function createRegisterFilter(options: JacdacRegisterFilterOptions) {
    const { register } = options
    return (reg: JDRegister) => !register
        || reg.code === parseInt(register, 16)
        || (reg.name && reg.name.toLocaleLowerCase() === register.toLocaleLowerCase())
}