import { JacdacCommandFilterOptions, JacdacDeviceFilterOptions, JacdacServiceFilterOptions } from "src/nodes/shared/types";

export interface JacdacCommandOptions extends JacdacDeviceFilterOptions, JacdacServiceFilterOptions, JacdacCommandFilterOptions {
}
