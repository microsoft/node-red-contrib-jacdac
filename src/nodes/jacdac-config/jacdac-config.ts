import { NodeInitializer } from "node-red"
import { JacdacConfigNode, JacdacConfigNodeDef } from "./modules/types"

const nodeInit: NodeInitializer = (RED): void => {
    function JacdacConfigNodeConstructor(
        this: JacdacConfigNode,
        config: JacdacConfigNodeDef
    ): void {
        RED.nodes.createNode(this, config)
    }

    RED.nodes.registerType("jacdac-config", JacdacConfigNodeConstructor)
}

export = nodeInit
