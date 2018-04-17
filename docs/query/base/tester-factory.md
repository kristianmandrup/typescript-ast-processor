# Tester factory

Main factory methods

## Tester

* `createTester` creates a specific node or details tester, calls `createCategoryTester`
* `createCategoryTester` creates a specific node or details (category) tester
* `createNodeTester` create a node tester
* `createDetailsTester` create a details tester

## List

* `createListTester` create a tester to generically test a list of nodes
* `createListTesterFor` create a list tester for matching a list of nodes, calls `createListTester`
