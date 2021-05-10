import { createUSBTransport, createNodeUSBOptions, JDBus } from "jacdac-ts"

const opts = createNodeUSBOptions()
const transport = createUSBTransport(opts)
export const bus = new JDBus([transport])
