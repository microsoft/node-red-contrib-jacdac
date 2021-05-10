import { Node, NodeDef } from "node-red";
import { JacdacEventOptions } from "../shared/types";

export interface JacdacEventNodeDef extends NodeDef, JacdacEventOptions {}

// export interface JacdacEventNode extends Node {}
export type JacdacEventNode = Node;
