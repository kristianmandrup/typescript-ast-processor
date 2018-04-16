import { isStr } from '../../../../util'

import { createNameTest, nameOf } from '../name'

/**
 * Test names that match query
 * @param names
 * @param query
 */
export function testNames(names: string[], query: any): any[] {
  query = query.names || query
  return names.reduce((acc: any, name: string) => {
    acc[name] = createNameTest(query)
    return acc
  }, {})
}

/**
 * Test if name matches query
 * @param name
 * @param query
 */
export function testName(name: any, query: any): boolean {
  name = isStr(name) ? name : nameOf(name)
  const nameTest = createNameTest(query.name || query)
  return nameTest(name)
}
