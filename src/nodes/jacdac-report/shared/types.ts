import {
    JacdacDeviceFilterOptions,
    JacdacGlobalConfigOptions,
    JacdacRegisterFilterOptions,
    JacdacServiceFilterOptions,
} from "../../shared/types"

export interface JacdacReportOptions
    extends JacdacDeviceFilterOptions,
        JacdacServiceFilterOptions,
        JacdacRegisterFilterOptions,
        JacdacGlobalConfigOptions {
    /**
     * Report updated data only
     */
    updates?: boolean
}
