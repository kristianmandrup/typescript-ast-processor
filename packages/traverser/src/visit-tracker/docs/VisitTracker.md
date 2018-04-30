# Visit Tracker

The visit tracker AST traverser should track which nodes have been visited.
It should maintain at least the following:

- `visitedNodes` list of nodes that have already been visited
- `lastNodeVisited`

The visit tracker should also add a node type to each node visited, resolving the enum key for the node `kind` by default, such as `FunctionDeclaration` instead of an enum index number such as `229`.

## Caching

We need to have one or more caches that are updated after a traversal, so that we can look up in the cache instead of having to re-traverse each time
