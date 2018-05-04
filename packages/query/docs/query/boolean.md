# Boolean logic queries

* AND via `AndQuery`
* OR via `OrQuery`
* NOT via `NotQuery`

Boolean logic can be combined for complex queries

Pass the boolean query and the tester (query) function to wrap with `and`, `or` or `not` boolean logic.

```js
query(query: any, tester?: Function)
```
