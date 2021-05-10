import { EditorNodeProperties } from "node-red";
import { JacdacEventOptions } from "../../shared/types";

export interface JacdacEventEditorNodeProperties
  extends EditorNodeProperties,
    JacdacEventOptions {}
