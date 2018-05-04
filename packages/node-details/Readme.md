# Node detail testers

Detail tester such as `ConditionalTester` all subclasses of `BaseDetailsTester`.
A details tester currently has the following form.

## Modifiers

```js
export class ConditionalTester extends BaseDetailsTester {
  // ...
  get syntaxMap() {
    return {
      if: ts.SyntaxKind.IfKeyword,
      else: ts.SyntaxKind.ElseKeyword,
      switch: ts.SyntaxKind.SwitchKeyword,
    }
  }

  else(node?: any) {
    return this.has('else', { node })
  }
}
```

## Flags

For testing flags, use a flagsMap

```js
export class NamespaceTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get flagMap() {
    return {
      namespace: ts.NodeFlags.Namespace,
      nestedNamespace: ts.NodeFlags.NestedNamespace,
    }
  }

  in(node?: any) {
    return this.has('namespace', { node })
  }
  nested(node?: any) {
    return this.has('nestedNamespace', { node })
  }
}
```

## Customization

Any such tester can be initialized with a node to test on. Alternatively pass the node as the single (optional) argument.

You can also combine with more specific tests, such as:

```js
  arrow(node?: any) {
    return this.has('arrow', { node })
  }

  generator(node?: any) {
    node = node || this.node
    return node.asteriskToken === ts.SyntaxKind.AsteriskToken
  }
```

Here the `generator` function could likely be re-written using the more generic `has` function, passing extra parameters such as the particular `modifierKey` to be used.

```js
  generator(node?: any) {
    this.has('generator', { node, modifierKey: 'asteriskToken' })
  }
```

For flags they are tested via logical and `&` using: `Boolean(node.flags & flag)`
For modifiers, by default we test if `node.modifiers` contains the `modifier` in question.
As this example illustrates, you can override which modifier key to use if and when needed.

Alternatively use the special `isXyz` methods available in the `typescript` module.
In case you don't use any of the maps such as `flagMap` or `syntaxMap` you need to provide a list of the checker function names available in `checkerNames`.

```js
export class LoopTester extends BaseDetailsTester {
  get checkerNames() {
    return ['for', 'while']
  }

  for(node: any) {
    node = this.nodeOf({ node })
    return (
      ts.isForStatement(node) ||
      ts.isForInStatement(node) ||
      ts.isForOfStatement(node)
    )
  }

  while(node?: any) {
    node = this.nodeOf({ node })
    return ts.isDoStatement(node) || ts.isWhileStatement(node)
  }
}
```
