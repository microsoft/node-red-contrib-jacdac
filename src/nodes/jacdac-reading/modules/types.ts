import { Node, NodeDef } from "node-red";
import { JacdacReadingOptions } from "../shared/types";

export interface JacdacReadingNodeDef extends NodeDef, JacdacReadingOptions {}

export type JacdacReadingNode = Node;
