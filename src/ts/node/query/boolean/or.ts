import { BooleanQuery } from './base'

export function orQuery(query: any, tester: Function) {
  if (!query) return false
  return Object.keys(query).find((key: string) => {
    const keyQuery = query[key]
    return tester({
      [key]: keyQuery,
    })
  })
}

export function createOrQuery(options: any = {}) {
  return new OrQuery(options)
}

export class OrQuery extends BooleanQuery {
  get iterator() {
    return 'find'
  }

  query(query: any, tester?: Function) {
    if (!super.query(query)) return false
    const matcherFn = tester || this.tester
    return query.or ? orQuery(query.or, matcherFn) : matcherFn(query)
  }
}
