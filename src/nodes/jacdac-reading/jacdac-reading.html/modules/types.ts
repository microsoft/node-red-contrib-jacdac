import { EditorNodeProperties } from "node-red";
import { JacdacReadingOptions } from "../../shared/types";

export interface JacdacReadingEditorNodeProperties
  extends EditorNodeProperties,
    JacdacReadingOptions {}
