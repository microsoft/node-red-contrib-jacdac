import { Node, NodeDef } from "node-red"
import { JacdacConfigOptions } from "../shared/types"

export interface JacdacConfigNodeDef extends NodeDef, JacdacConfigOptions {}

// export interface JacdacConfigNode extends Node {}
export type JacdacConfigNode = Node
