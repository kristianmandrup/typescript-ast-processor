export const ast = {
  declarations: {
    Greeting: {
      type: 'class',
    },
    sayHello: {
      type: 'function',
    },
  },
  functions: {
    sayHello: {
      params: [
        {
          id: 'x',
          type: 'string',
        },
      ],
    },
  },
  classes: {
    Greeting: {
      abstract: false,
      extends: {
        id: 'Loggable',
        node: {}, // interface node ref
      },
      implements: {
        ILoggable: {
          node: {}, // interface node ref
        },
      },
      constructors: [
        // no args
        {
          params: {},
        },
        // single name arg
        {
          params: [
            {
              id: 'x',
              type: 'string',
            },
          ],
        },
      ],
      members: {
        hello: {
          type: 'method',
          access: 'public',
        },
        name: {
          type: 'property',
          access: 'private',
        },
        age: {
          type: 'property',
          access: 'protected',
        },
      },
      properties: {
        name: {
          type: 'string',
          access: 'private',
        },
        age: {
          type: 'number',
          access: 'protected',
        },
      },
      methods: {
        hello: {
          access: 'public',
          params: [
            {
              id: 'x',
              type: 'string',
            },
          ],
          returnType: 'string',
        },
      },
    },
  },
}
