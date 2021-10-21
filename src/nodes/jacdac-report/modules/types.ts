import { Node, NodeDef } from "node-red"
import { JacdacReportOptions } from "../shared/types"

export interface JacdacReportNodeDef extends NodeDef, JacdacReportOptions {}

export type JacdacReportNode = Node
