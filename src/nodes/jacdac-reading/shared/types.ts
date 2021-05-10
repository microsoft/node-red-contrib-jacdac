import { JacdacDeviceFilterOptions, JacdacRegisterFilterOptions, JacdacServiceFilterOptions } from "../../shared/types";

export interface JacdacReadingOptions extends JacdacDeviceFilterOptions, JacdacServiceFilterOptions, JacdacRegisterFilterOptions {
  /**
   * Report updated data only
   */
   updates?: boolean
}
