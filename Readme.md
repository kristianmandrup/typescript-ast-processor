# Quick AST (QAST)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

QAST is designed as a foundation for writing tools that work with the TypeScript AST. It aims to provide a higher level API, query engine, node data aggregators etc.

QAST should alleviate much of the pain when working with the AST directly.
It lets you work at a higher abstraction level than with the "bare metal" AST, while still making it available when necessary.

Also see [additional docs](docs/index.md)

## Mono repo

QAST is currently structured as a mono repo, using [lerna](https://lernajs.io/) with [yarn workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)

## Lerna packages

* [core](packages/core/Readme.md)
* [traverser](packages/traverser/Readme.md)
* [visitor](packages/visitor/Readme.md)
* [instrumentor](packages/instrumentor/Readme.md)
* [node](packages/node/Readme.md)
* [node-matcher](packages/node-matcher/Readme.md)
* [node-details](packages/node-details/Readme.md)
* [node-types](packages/node-types/Readme.md)
* [query](packages/query/Readme.md)
* [service](packages/service/Readme.md)
* [utils](packages/utils/Readme.md)
* [loggable](packages/loggable/Readme.md)
* [test-utils](packages/test-utils/Readme.md)

## Disclaimer

Please help contribute to make it happen, see [Contributing](CONTRIBUTING.md)

## Resources

* [TypeScript: Using-the-Compiler-API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)

See [Resources](docs/resources.md) for more

## Testing

See [Testing](docs/testing.md)

## Tool integration

We will try to make it easy to integrate other tools, so that this design is intent bases without making assumptions about underlying use or implementation.

For more see [Tool integration](docs/tool-integration.md)

### Customization

You should be able to use [tsutils](https://github.com/ajafff/tsutils) to make it easier to gather information and work with the underlying typescript AST.

## ESLint traverser

We intend to extend [astravel](https://github.com/kristianmandrup/astravel) to have a similar API and design if this turns out to be as awesome as we think it could be...

## Author

Kristian Mandrup

## License

MIT
