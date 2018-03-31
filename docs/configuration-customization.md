# Configuration and Customization

The design is highly configurable and customizable via extensive use of factory mapping.
Simply extend or replace the classes that you need and provide custom factory functions in a custom factory map.

The built-in factory map looks as follows:

## Factories

```js
export const factories = {
  node,
  visitor: {
    createVisitorFactory
  },
  traverser: {
    createASTNodeTraverser,
    createCountingASTNodeTraverser
  }
}
```

## Using custom factory map

Disclaimer: Has yet to be implemented, but most of the infra is in place

```js
function createMyCustomASTNodeTraverser(
  // ...
) {
  // ...
  return traverser
}

const myFactories = {
  traverser: {
    createASTNodeTraverser: createMyCustomASTNodeTraverser
  }
}

const loader = createLoader({
  compiler: compilerOpts,
  languageVersion,
  factories: myFactories // will be deep merged on top of built-in factories map
})
```
