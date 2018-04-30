# Variable Declaration Node Testers

Contains the following testers:

- `VariableDeclarationNodeTester`
- `VariableDeclarationNodesTester`

## VariableDeclarationNodesTester

### declarations: info

Sample `VariableDeclarationNodesTester.info()` result:

```js
{
  count: 2,
  names: ['a', 'b'],
  varType: 'let'
}
```

There are two variable declarations

### object: test/query

Sample `query`:

```js
{
  count: {
    max: 2
  },
  names: {
    anyOf ['a', 'b', /c/]
  },
  // TODO
  initializer: {
    anyOf: ['object', 'array']
  }
}
```

The initializer can test if the variable is initialized to an expression of a specific kind, such as:

- `class`
- `function`
- `literal` value (ie. `object`, `array`, `null` etc.)

## VariableDeclarationNodeTester

### declaration: info

Sample `VariableDeclarationNodeTester.info()` result:

```js
{
  name: 'a'
  varType: 'const'
}
```

### declaration: test/query

Sample `query`:

```js
{
  name: {
    anyOf: ['a', /b/]
  },
  // TODO
  varType: {
    not: {
      anyOf: ['let', 'var']
    }
  },
  initializer: {
    anyOf: ['object', 'array']
  }
}
```

The initializer can test if the variable is initialized to an expression of a specific kind, such as:

- `class`
- `function`
- `literal` value (ie. `object`, `array`, `null` etc.)
