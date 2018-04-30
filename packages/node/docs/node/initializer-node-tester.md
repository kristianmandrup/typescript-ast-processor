# Initializer node tester

## info

Info for an `array` initializer

```js
{
  type: 'object',
  value: [1, 2],
  textValue: '[1, 2]'
}
```

Info for an `object` initializer

```js
{
  type: 'object',
  value: {x: 2},
  textValue: '{x: 2}'
}
```

Info for a `string` initializer setting string to `'x'`

```js
{
  type: 'string',
  value: 'x'
  textValue: '"x"'
}
```

## test/query

Find a `object` initializer that sets a property named `y`

```js
{
  type: 'string',
  properties: {
    named: 'y'
  }
}
```

Query result

```js
{
  type: 'string',
  properties: [
    'y'
  ]
}
```
