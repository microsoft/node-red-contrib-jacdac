# Contributing

## Adding Nodes

You can quickly scaffold a new node and add it to the node set. Use the following command to create `my-new-node-type` node:

```
yarn add-node my-new-node-type
```

The node generator is based on mustache templates. At the moment there are three templates available:

-   `blank` (used by default) - basic node for Node-RED >=1.0
-   `blank-0` - node with a backward compatibility for running on Node-RED <1.0
-   `config` - configuration node

To generate a node using a template, specify it as the third argument:

```
yarn add-node my-new-node-type blank
```

or

```
yarn add-node my-new-node-config config
```

## Developing Nodes

Build & Test in Watch mode:

```
yarn dev
```

## Building Node Set

Create a production build:

```
yarn build
```

## Local debugging

Local node debugging instructions at https://nodered.org/docs/creating-nodes/first-node#:~:text=To%20test%20a%20node%20module%20locally%20the%20npm,~%2F.node-red%2C%20run%3A%20npm%20install%20%3Clocation%20of%20node%20module%3E.