# Node-RED Jacdac Node

[Node-RED](https://nodered.org) nodes to talk to [Jacdac](https://aka.ms/jacdac).

Jacdac is a bus-based plug-and-play hardware and software stack for microcontrollers and their peripherals such as sensors and actuators. Jacdac is primarily designed for “modular electronics” scenarios that support rapid prototyping, creative exploration, making and learning through physical computing. Jacdac is designed to be cheap, flexible and extensible.

The nodes connect to a Jacdac bus via a USB and allow to listen for events or sensor readings.

## Requirements

This node uses [node-usb](https://github.com/tessel/node-usb) which has specific installation requirements. If your node-red process crashes with 
``LIBUSB_ERROR_NOT_SUPPORTED``, your USB setup is not right.

## Install

Use Palette manager in node-red or run the following command in your Node-RED user directory - typically ``~/.node-red``

    npm install node-red-contrib-jacdac

## Jacdac firmware

You will need to connect a device with Jacdac firmware and USB port. 
You can learn more about compatible hardware at https://aka.ms/jacdac.

If you have a micro:bit V2 at hand, you can convert it into a Jacdac device by dropping
custom firmware.

* go to https://makecode.microbit.org/beta#pub:github:microsoft/pxt-jacdac/devices/microbit
* download to your micro:bit V2

## Nodes

### jacdac-event

This node listens for [Jacdac events](https://microsoft.github.io/jacdac-docs/reference/protocol#events) and send them in the payload. 
You can browse the [services specification catalog](https://microsoft.github.io/jacdac-docs/services/) to discover which events are available.

### jacdac-read

This node listens for [Jacdac reading](https://microsoft.github.io/jacdac-docs/reference/protocol#registers) and send them in the payload. 
You can browse the [services specification catalog](https://microsoft.github.io/jacdac-docs/services/) to discover which registers are avilable are available.

By default, the node looks for sensor reading, value and intensity registers. 
But you can override this behavior by customizing the register filters by name or code.

## Developer section
### Adding Nodes

You can quickly scaffold a new node and add it to the node set. Use the following command to create `my-new-node-type` node:

```
yarn add-node my-new-node-type
```

The node generator is based on mustache templates. At the moment there are three templates available:

- `blank` (used by default) - basic node for Node-RED >=1.0
- `blank-0` - node with a backward compatibility for running on Node-RED <1.0
- `config` - configuration node

To generate a node using a template, specify it as the third argument:

```
yarn add-node my-new-node-type blank
```

or

```
yarn add-node my-new-node-config config
```

### Developing Nodes

Build & Test in Watch mode:

```
yarn dev
```

### Building Node Set

Create a production build:

```
yarn build
```

## Acknoledgments

This repo was built using the [node-red TypeScript starter](https://github.com/alexk111/node-red-node-typescript-starter).

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
