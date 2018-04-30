export function testNot(query: any, tester: Function) {
  if (!query) return true
  return query.not ? !Boolean(tester(query.not)) : tester(query)
}

/**
 * An OR query can be expressed as simply a find iterator on list of queries
 * Returning first one that is a success
 * @param query
 * @param tester
 */
export function orQuery(query: any, tester: Function) {
  if (!query) return false
  return Object.keys(query).find((key: string) => {
    const keyQuery = query[key]
    return tester({
      [key]: keyQuery
    })
  })
}

/**
 * An AND query can be expressed as simply a every iterator on list of queries
 * Returning all results accumulated if all are successful otherwise returning false
 * @param query
 * @param tester
 */
export function andQuery(query: any, tester: Function) {
  if (!query) return false
  const acc: any = {}
  const every = Object.keys(query).every((key: string) => {
    const keyQuery = query[key]
    const result = tester({
      [key]: keyQuery
    })
    if (result) {
      acc[key] = result
    }
    return Boolean(result)
  })
  return every ? acc : false
}


/**
 * Query using boolean OR if query contains or
 * @param query
 * @param tester
 */
export function testOr(query: any, tester: Function) {
  if (!query) return true
  return query.or ? orQuery(query.or, tester) : tester(query)
}

/**
 * Query using boolean OR if query contains or
 * @param query
 * @param tester
 */
export function testAnd(query: any, tester: Function) {
  if (!query) return true
  return query.and ? andQuery(query.and, tester) : tester(query)
}
