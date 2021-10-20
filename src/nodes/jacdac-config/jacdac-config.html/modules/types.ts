import { EditorNodeProperties } from "node-red"
import { JacdacConfigOptions } from "../../shared/types"

export interface JacdacConfigEditorNodeProperties
    extends EditorNodeProperties,
        JacdacConfigOptions {}
