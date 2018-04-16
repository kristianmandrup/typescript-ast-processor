import { DeclarationNodeTester } from '../declaration'

/**
 * Factory to create class tester to query and collect data for class node
 * @param node
 * @param options
 */
export function createClassTester(node: any, options: any = {}) {
  return new ClassNodeTester(node, options)
}

export class ClassNodeTester extends DeclarationNodeTester {
  /**
   * Create class tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any = {}) {
    super(node, options)
    this.init(node)
  }

  /**
   * Query/info properties
   */
  get qprops() {
    return ['name', 'exported', 'abstract', 'implements', 'extends', 'members']
  }

  /**
   * Collect all info for class node
   */
  info() {
    return {
      ...super.info(),
      abstract: this.isAbstract,
      heritage: this.heritage,
    }
  }

  /**
   * Get class node details tester
   */
  get classTester() {
    return this.getTester({
      type: 'details',
      name: 'class',
    })
  }

  /**
   * whether class is abstract
   */
  get isAbstract() {
    return this.classTester.is('abstract')
  }

  get heritageTester() {
    return this.getTester({
      name: 'heritage',
    })
  }

  /**
   * Heritage of the class
   */
  get heritage() {
    return this.heritageTester.info()
  }

  /**
   * Testers map
   */
  get testerMap() {
    return {
      heritage: 'class.heritage',
      members: 'class.members',
      class: {
        factory: 'class.members',
        type: 'details',
      },
    }
  }

  /**
   * test map used to create test/query methods
   */
  get testMethodMap() {
    return {
      members: {
        // Query all class members
        name: 'members',
        test: 'testMembers',
      },
      accessors: {
        // query accessors (getters/setters)
        name: 'members',
        test: 'testAccessors',
      },
      implements: {
        // Query what interfaces class implements
        qprop: 'implements',
        name: 'heritage',
      },
      extends: {
        qprop: 'extends',
        name: 'heritage',
      },
      // test if abstract matches query true|false
      // see testAbstract
      abstract: {
        bool: 'isAbstract',
      },
    }
  }
}
