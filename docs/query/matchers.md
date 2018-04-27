# Matchers

See `node/query/matcher` folder

## Factory functions

* `createFunctionMatcher` create a function to call a function that matches value
* `createNumberMatcher` create a function to match if a number matches (is equal to) a number
* `createStringMatcher` create a function to match if a string matches (is equal to) a string
* `createRegExprMatcher` create a function to match if a string matches a regular expression
* `createRangeMatcher` create a function to match if a number is within a numeric range
* `createListMatcher` create a function to match a list of values
* `createMatcherSelector` create a function to select a matcher for the value

## Classes

* `FunctionMatcher`
* `NumberMatcher`
* `StringMatcher`
* `RegExprMatcher`
* `RangeMatcher`
* `ListMatcher`
* `MatcherSelector` class used to select a matcher for the value to be matched
