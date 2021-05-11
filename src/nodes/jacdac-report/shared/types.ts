import { JacdacDeviceFilterOptions, JacdacRegisterFilterOptions, JacdacServiceFilterOptions } from "../../shared/types";

export interface JacdacReportOptions extends JacdacDeviceFilterOptions, JacdacServiceFilterOptions, JacdacRegisterFilterOptions {
  /**
   * Report updated data only
   */
   updates?: boolean
}
