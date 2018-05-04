# ClassNodeTester

## info

Sample `ClassNodeTester.info()` result:

```js
{
  name: 'NodeTester'
  abstract: false
  heritage: {
    implements: ['ITester', 'ILoggable'],
    extends: 'BaseTester'
  }
  exported: true
}
```

## test/query

Sample `query`:

```js
{
  name: {
    anyOf: [/Node/],
  },
  abstract: true,
  heritage: {
    implements: {
      allOf: ['ITester', /ILog/]
    },
    extends: {
      named: 'BaseTester'
    }
  },
  exported: true
}
```

Find a class node:

- where `name` matches /Node/
- which is `abstract`
- which implements both `ITester` and `/ILog/`
- which extends `BaseTester`
- which is `exported`

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  name: ['NodeTester']
  abstract: true,
  heritage: {
    implements: ['ITester', 'ILoggable'],
    extends: 'BaseTester'
  }
  exported: true
}
```

## TODO

We need to add members `info` and `query` shortly.
