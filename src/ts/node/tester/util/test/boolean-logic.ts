export function testNot(query: any, tester: Function) {
  if (!query) return true
  return query.not ? !Boolean(tester(query.not)) : tester(query)
}

// TODO
export function orQuery(query: any, tester: Function) {
  throw new Error('Not yet implemented')
}

export function testOr(query: any, tester: Function) {
  if (!query) return true
  return query.or ? orQuery(query.or, tester) : tester(query)
}
