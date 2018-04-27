# Type node tester

## info

Info for a simple `string` primitive type

```js
{
  typeName: 'string',
  union: false,
  unionTypes: [],
  primitive: true,
  complex: false
}
```

Info for a union type `string | string[]` primitive type

```js
{
  typeName: 'string | string[]',
  union: true,
  unionTypes: ['string', 'string[]'],
  primitive: false,
  complex: true
}
```

## test/query

Find any type that is "string like" and is a union type

```js
{
  typeName: {
    anyOf: [/string/]
  },
  union: true
}
```

Query result

```js
{
  typeName: 'string | string[]',
  union: true,
}
```
