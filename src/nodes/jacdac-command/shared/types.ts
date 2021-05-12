import {
  JacdacCommandFilterOptions,
  JacdacDeviceFilterOptions,
  JacdacServiceFilterOptions,
} from "../../shared/types";

export interface JacdacCommandOptions
  extends JacdacDeviceFilterOptions,
    JacdacServiceFilterOptions,
    JacdacCommandFilterOptions {}
