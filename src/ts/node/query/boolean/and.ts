import { BooleanQuery } from './base'

export function andQuery(query: any, tester: Function) {
  if (!query) return false
  const acc: any = {}
  const every = Object.keys(query).every((key: string) => {
    const keyQuery = query[key]
    const result = tester({
      [key]: keyQuery,
    })
    if (result) {
      acc[key] = result
    }
    return Boolean(result)
  })
  return every ? acc : false
}

export function createAndQuery(options: any = {}) {
  return new AndQuery(options)
}

export class AndQuery extends BooleanQuery {
  query(query: any, tester?: Function) {
    const matcherFn = tester || this.tester
    if (!query) return true
    return query.and ? andQuery(query.and, matcherFn) : matcherFn(query)
  }
}
