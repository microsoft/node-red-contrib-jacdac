import {
    JacdacDeviceFilterOptions,
    JacdacEventFilterOptions,
    JacdacGlobalConfigOptions,
    JacdacServiceFilterOptions,
} from "../../shared/types"

export interface JacdacEventOptions
    extends JacdacDeviceFilterOptions,
        JacdacServiceFilterOptions,
        JacdacEventFilterOptions,
        JacdacGlobalConfigOptions {}
