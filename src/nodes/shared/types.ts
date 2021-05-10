export interface JacdacDeviceFilterOptions {
    /**
     * A filter to select a specific device, long device id or short device id
     */
    device?: string
}

export interface JacdacServiceFilterOptions {
    /**
     * A filter to select a specific service. Name or code of the service
     */
    service?: string
}
export interface JacdacEventFilterOptions {
    /**
     * A filter to select a specific event. Name or code of the event
     */
    event?: string
}

export interface JacdacRegisterFilterOptions {
    /**
     * A filter to select a specific register. Name or code of the event
     */
    register?: string
}
