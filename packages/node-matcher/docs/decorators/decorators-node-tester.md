# Decorator Node tester

The following decorator node testers are available:

- `ClassDecoratorNodeTester`
- `MemberDecoratorNodeTester` (for class: methods, accessor, properties)
- `ParameterDecoratorNodeTester`

## info

```js
{
  name: 'autobind',
  decorator: true,
  target: {
    id: 'handleClick',
    type: 'member'
  }
}
```

## test/query

```js
{
  name: {
    anyOf: [/auto/]
  }
}
```

Query result

```js
{
  name: 'autobind',
}
```
