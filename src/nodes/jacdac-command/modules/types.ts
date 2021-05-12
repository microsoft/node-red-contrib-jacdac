import { Node, NodeDef } from "node-red";
import { JacdacCommandOptions } from "../shared/types";

export interface JacdacCommandNodeDef extends NodeDef, JacdacCommandOptions {}

// export interface JacdacCommandNode extends Node {}
export type JacdacCommandNode = Node;
