import { EditorNodeProperties } from "node-red";
import { JacdacReportOptions } from "../../shared/types";

export interface JacdacReportEditorNodeProperties
  extends EditorNodeProperties,
    JacdacReportOptions {}
