import {
    JacdacCommandFilterOptions,
    JacdacDeviceFilterOptions,
    JacdacGlobalConfigOptions,
    JacdacServiceFilterOptions,
} from "../../shared/types"

export interface JacdacCommandOptions
    extends JacdacDeviceFilterOptions,
        JacdacServiceFilterOptions,
        JacdacCommandFilterOptions,
        JacdacGlobalConfigOptions {}
