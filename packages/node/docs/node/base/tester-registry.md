# Tester Registry

* `setTester(opts)` set a tester using config object
* `setTesters()` set testers using `testerMap` config
* `getTester(opts)` get a tester using either config object or name
* `hasTester(opts)` test if has a tester?
* `getProp(opts)` get property of tester

## setTester(opts)

Sets a tester in the tester registry of a node tester.
Testers are used to `test`, `query` and gather `info` on child nodes of the main node bein tested. Note: `setTester` can be chained.

```js
setTester({
  type: 'node', // details or node tester
  name: 'function', // registration name in testers map
  factory: 'decl.function', // tester factory name to call (lookup in factory map)
  when: (node) => node.function, // condition for whether to register the tester
  node: node.function, // the node to use as the main node in the tester
  options: this.options, // tester options
})
```

## setTesters

Sets testers on node tester using `testerMap`. Iterates through this map/object and calls
`setTester` for each entry, using the key as `name`, `this.node` as `node` and `this.options` as `options`. If the entry value is a string, the value will be used as `factory` otherwise the object is used in full (see `setTester`)

```js
get testerMap() {
  return {
    id: 'identifier', // value used as factory name
    function: {
      factory: 'decl.function',
      when(node) => node.members
    }
    // ... more entries
  }
}

init() {
  // ...
  this.setTesters()
}
```

## getTester(opts)

Get a registered tester by name or registration object.

Node tester (default)

```js
getTester('function')
```

Using type prefix

```js
getTester('details:function')
```

Detailed lookup

```js
getTester({
  type: 'details',
  name: 'function',
})
```

## hasTester(opts)

Node tester (default)

```js
hasTester('function')
```

Using type prefix

```js
hasTester('details:function')
```

Detailed lookup

```js
hasTester({
  type: 'details',
  name: 'function',
})
```

## getProp(opts)

Get property value of tester

Calls `getTester` with `opts` to get a registered tester, then uses options to determine how to retrieve a property or call a function on the `tester`.

* `is` call `is` on tester with the `is` value as argument (only works on a details tester)
* `fun` call a function on tester
* `args` arguments list to pass to function if `fun` set
* `default` default value to use if property value returned is undefined

Retrieve node tester `class.heritage` and call `info()` to get the info

```js
getProp('class.heritage')
```

Retrieve details tester `function` and call `.is('async')` to get indication if this is an async function node.

```js
getProp({
  name: 'details:function',
  is: 'async',
})
```

Retrieve node tester `function` and call `.testName(args)` to get indication if this is an async function node.

```js
getProp({
  name: 'function',
  fun: 'tesType',
  default: 'implicit:any', // default if no type
})
```

Retrieve node tester `function` and get the `name` property of the tester (ie. function name)

```js
getProp({
  name: 'function',
  prop: 'name',
})
```
