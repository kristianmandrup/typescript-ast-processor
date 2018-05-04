# Testing

Base query (ie. test base class methods used by all other query classes!)

`jest __tests__/ts/node/query/base.test.ts`

Match `allOf` query

`jest __tests__/ts/node/query/all.test.ts`

Match `anyOf` query

`jest __tests__/ts/node/query/any.test.ts`

Match `exactly` query

`jest __tests__/ts/node/query/exactly.test.ts`

## Matchers

Used by queries to match on individual values

* String matcher: `jest __tests__/ts/node/query/matcher/string.test.ts`
* Number matcher: `jest __tests__/ts/node/query/matcher/number.test.ts`
* ...

## Boolean

* `not` query: `jest __tests__/ts/node/query/boolean/not.test.ts`
* `and` query: `jest __tests__/ts/node/query/boolean/and.test.ts`
* `or` query: `jest __tests__/ts/node/query/boolean/or.test.ts`
