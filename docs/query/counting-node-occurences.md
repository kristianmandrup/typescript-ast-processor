# Counting node occurences

In some cases you just need to count the number of occurences within one or more subtrees of one or more types of nodes, often with the added constraint that some subtrees within must be ignored when counting.

F.ex given a function block, if you want to count the number of `return` statements, it makes no sense to go into any internal function or class declarations, as any return within those belong to their own scope.

To facilitate counting occurences you can use the following methods available on the `BaseNodeTester`:

- `countOccurrence(options): number`
- `countInTree(query): number`

## countOccurrence

Options can take any of the following

- `excludeVisit` list of expressions for node types to exclude, each a `RegExp` or `string`
- `typeChecker` custom function to test and determine which nodes to visit and count
- `types` types of nodes to visit and count
- `includeAll` to not exclude any nodes from visit

Note that the `typeChecker` can be used to add additional custom constraints, using Node testers etc.

`countOccurrence` creates a `query` object, and calls `countInTree` with the `query`

## countInTree

Takes a `count` nodes expression, creates a new `ASTNodeTraver` instance passing this query and let's the `ASTNodeTraver` count each node type (to be counted) given the query conditions.
