import { EditorNodeProperties } from "node-red";
import { JacdacCommandOptions } from "../../shared/types";

export interface JacdacCommandEditorNodeProperties
  extends EditorNodeProperties,
    JacdacCommandOptions {}
