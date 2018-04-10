import { BaseNodeTester } from '../../base'

// PropertyAccessExpression

// TODO: For use when testing deep property access into objects

/**
 * Factory to create property access node tester
 * Can be used to test property access
 * @param node
 * @param options
 */
export function createPropertyAccessNodeTester(node: any, options: any = {}) {
  return new PropertyAccessNodeTester(node, options)
}


/**
 * TODO
 */
export class PropertyAccessNodeTester extends BaseNodeTester {

}
