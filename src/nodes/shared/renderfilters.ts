import {
    JacdacCommandFilterOptions,
    JacdacDeviceFilterOptions,
    JacdacEventFilterOptions,
    JacdacRegisterFilterOptions,
    JacdacServiceFilterOptions,
} from "./types"

export function renderDeviceFilter(options: JacdacDeviceFilterOptions) {
    const { device } = options
    return device || "*"
}

export function renderServiceFilter(options: JacdacServiceFilterOptions) {
    const { service, serviceIndex, serviceInstanceName } = options

    const parts = [
        serviceIndex !== undefined ? `[${serviceIndex}]` : undefined,
        service,
        serviceInstanceName,
    ].filter(p => !!p)
    return parts.length ? parts.join(":") : "*"
}

export function renderEventFilter(options: JacdacEventFilterOptions) {
    const { event } = options
    return event || "*"
}

export function renderRegisterFilter(options: JacdacRegisterFilterOptions) {
    const { register } = options
    return register || "*"
}

export function renderCommandFilter(options: JacdacCommandFilterOptions) {
    const { command } = options
    return command || "?"
}
