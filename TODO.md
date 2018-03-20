# TODO

## Tests

- Write full test suite ;)

## Implementation

Start work on collectors and instrumentors. They should (possibly?) be registered with same names as visitors, so that data flows from visitor -> collector -> instrumentor.

For data aggregation, we can have multiple collectors call an aggregator (like cells to a molecule) with their data (can be multi-level hierarchy).

The instrumentor should only instrument using a single root data aggregator (or single data source)
