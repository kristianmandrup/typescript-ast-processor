export const assertion = [
  'TypeAssertion',
]

export const type = [
  'TypeAssertion',
  'PartOfTypeNode',
  'TypeNode',
  'FunctionOrConstructorTypeNode',
  'TypePredicateNode',
  'TypeReferenceNode',
  'FunctionTypeNode',
  'ConstructorTypeNode',
  'TypeQueryNode',
  'TypeLiteralNode',
  'ArrayTypeNode',
  'TupleTypeNode',
  'UnionTypeNode',
  'IntersectionTypeNode',
  'ParenthesizedTypeNode',
  'ThisTypeNode',
  'TypeOperatorNode',
  'IndexedAccessTypeNode',
  'MappedTypeNode',
  'LiteralTypeNode'
]

export const primitives = {
  basic: [
    'Word',
    'Array',
    'String',
    'Url',
    'Parameter',
    'Decorator',
    'Comment',
  ],
  range: [
    'CollapsedRange',
  ],
  set: [
    'WatchSet',
  ]
}

export const whitespace = [
  'WhiteSpaceLike',
  'WhiteSpaceSingleLine',
  'LineBreak',
  'WhiteSpaceOnlyJsxText',
]

export const identifier = [
  'GeneratedIdentifier',
  'Identifier',
  'IdentifierStart',
  'IdentifierPart',
  'IdentifierText',
  'UnicodeIdentifierStart',
  'IdentifierName',
  'ESSymbolIdentifier',
  'PushOrUnshiftIdentifier',
  'ThisIdentifier',
]

export const name = [
  'QualifiedName',
  'IdentifierName',
  'DynamicName',
  'EntityName',
  'PropertyName',
  'BindingName',
  'PropertyAccessOrQualifiedName',
  'InternalName',
  'LocalName',
  'ExportName',
  'LabelName',
  'LiteralNameOfPropertyDeclarationOrIndexAccess',
]

export const comment = [
  'InComment',
  'InReferenceComment',
  'InNonReferenceComment',
  'PinnedComment',
  'RecognizedTripleSlashComment',
]

export const program = {
  any: [
    'ProgramUptoDate',
    'EmittedFileOfProgram',
    'TraceEnabled',
  ],
  sourceFile: [
    'SupportedSourceFileName',
    'SourceFileJavaScript',
    'SourceFile',
    'Bundle',
  ],
  error: [
    'ErrorNoInputFiles',
  ]
}

export const disk = [
  'RootedDiskPath',
  'ImplicitGlob',
]

export const digit = [
  'OctalDigit',
]

export const block = [
  'BlockOrCatchScoped',
  'FunctionBlock',
  'Block',
  'ModuleBlock',
  'CaseBlock',
]

export const module = {
  any: [
    'ImportOrExportSpecifierName',
    'ModuleReference',
    'ModuleWithStringLiteralName',
    'InstantiatedModule',
  ],
  ambient: [
    'AmbientModule',
    'NonGlobalAmbientModule',
    'ShorthandAmbientModuleSymbol',
  ],
  external: [
    'ExternalModuleSymbol',
    'ExternalModuleReference',
    'ExternalModuleNameRelative',
    'ExternalModuleAugmentation',
    'EffectiveExternalModule',
    'ExternalOrCommonJsModule',
    'ExternalModuleImportEqualsDeclaration',
    'ExternalModule',
    'ExpressionOfExternalModuleImportEqualsDeclaration',
  ],
  internal: [
    'InternalModuleImportEqualsDeclaration',
  ],
  import: [
    'ImportOrExportSpecifierName',
    'InRightSideOfInternalImportEqualsDeclaration',
    'NamedImportBindings',
    'ImportSpecifier',
    'NamedImports',
    'AnyImportSyntax',
    'DefaultImport',
    'ImportEqualsDeclaration',
    'ImportDeclaration',
    'ImportClause',
  ],
  export: [
    'ImportOrExportSpecifierName',
    'ExportsOrModuleExportsOrAlias',
    'ExportName',
    'NamedExports',
    'ExportAssignment',
    'ExportDeclaration',
    'ExportSpecifier',
    'ExportsIdentifier',
    'ModuleExportsPropertyAccessExpression',
  ]
}

export const srcFormats = [
  'CheckJsEnabledForFile',
  'AnySupportedFileExtension',
]

export const body = [
  'ConciseBody',
  'FunctionBody',
  'ModuleBody',
  'NamespaceBody',
  'JSDocNamespaceBody',
]

export const loop = {
  flow: [
    'IterationStatement',
    'ContinueStatement',
    'BreakStatement',
    'BreakOrContinueStatement',
  ],
  for: [
    'ForInitializer',
    'ForInOrOfStatement',
    'ForStatement',
    'ForInStatement',
    'ForOfStatement',
  ],
  while: [
    'DoStatement',
    'WhileStatement',
  ]
}

export const conditional = {
  if: [
    'IfStatement',
  ],
  switch: [
    'SwitchStatement',
    'CaseOrDefaultClause',

  ]
}

export const error = [
  'ThrowStatement',
  'TryStatement',
]

export const statement = {
  any: [
    'DeclarationStatement',
    'StatementButNotDeclaration',
    'Statement',
    'NotEmittedStatement',
    'StatementWithLocals',
    'VariableStatement',
    'EmptyStatement',
    'ExpressionStatement',
    'ReturnStatement',
    'WithStatement',
    'LabeledStatement',
    'DebuggerStatement',
  ],
  conditional,
  error,
  loop
}

export const scope = [
  'BlockScopedContainerTopLevel',
  'GlobalScopeAugmentation',
  'BlockScope',
]

export const declaration = {
  any: [
    'Declaration',
    'DeclarationStatement',
    'DeclarationWithTypeParameters',
    'NodeWithPossibleHoistedDeclaration',
    'DeclarationName',
    'AnyDeclarationName',
    'IndexSignatureDeclaration',
    'MissingDeclaration',
  ],
  function: [
    'NameOfFunctionDeclaration',
    'FunctionDeclaration',
    'CallSignatureDeclaration',
  ],
  interface: [
    'InterfaceDeclaration',
  ],
  enum: [
    'EnumDeclaration',
    'ModuleOrEnumDeclaration',
  ],
  class: [
    'ClassDeclaration',
    'MethodDeclaration',
    'ConstructorDeclaration',
    'GetAccessorDeclaration',
    'SetAccessorDeclaration',
    'ConstructSignatureDeclaration',
  ],
  type: [
    'TypeAliasDeclaration',
    'TypeParameterDeclaration',
  ],
  symbol: [
    'AliasSymbolDeclaration',
    'ValidESSymbolDeclaration',
  ],
  property: [
    'LiteralComputedPropertyDeclarationName',
    'SpecialPropertyDeclaration',
  ],
  parameter: [
    'ParameterDeclaration',
    'ParameterPropertyDeclaration',
  ],
  module: [
    'NameOfModuleDeclaration',
    'ModuleOrEnumDeclaration',
    'ModuleDeclaration',
    'ExternalModuleImportEqualsDeclaration',
    'InternalModuleImportEqualsDeclaration',
  ],
  variable: [
    'VariableDeclaration',
    'VariableDeclarationList',
    'EnumDeclaration',
    'Const',
    'Let',
  ]
}

export const variable = [
  'VariableLike',
  'VariableDeclarationInVariableStatement',
]

export const call = [
  'SuperCall',
  'ImportCall',
  'RequireCall',
]

export const node = {
  any: [
    'NotEmittedOrPartiallyEmittedNode',
    'StringTextContainingNode',
    'Node',
    'NodeKind',
    'NodeArray',
    'ChildOfNodeWithKind',
    'ParseTreeNode',
  ],
  type: [
    'PartOfTypeNode',
    'TypeNode',
    'FunctionOrConstructorTypeNode',
    'TypePredicateNode',
    'TypeReferenceNode',
    'FunctionTypeNode',
    'ConstructorTypeNode',
    'TypeQueryNode',
    'TypeLiteralNode',
    'ArrayTypeNode',
    'TupleTypeNode',
    'UnionTypeNode',
    'IntersectionTypeNode',
    'ParenthesizedTypeNode',
    'ThisTypeNode',
    'TypeOperatorNode',
    'IndexedAccessTypeNode',
    'MappedTypeNode',
    'LiteralTypeNode',
  ]
}

export const symbol = [
  'FirstDeclarationOfSymbolParameter',
  'AliasSymbolDeclaration',
  'ValidESSymbolDeclaration',
  'WellKnownSymbolSyntactically',
  'KnownSymbol',
  'ESSymbolIdentifier',
]

export const method = [
  'ObjectLiteralMethod',
  'ObjectLiteralOrClassExpressionMethod',
  'MethodOrAccessor',
]

export const predicate = [
  'IdentifierTypePredicate',
  'ThisTypePredicate',
]

export const property = [
  'SuperProperty',
  'ThisProperty',
  'RightSideOfQualifiedNameOrPropertyAccess',
  'ParameterPropertyDeclaration',
  'PropertySignature',
  'PropertyDeclaration',
  'MetaProperty',
  'PropertyAccessOrQualifiedName',
]

export const inside = [
  'InJSDoc',
  'InJavaScriptFile',
  'InString',
  'InTemplateString',
  'InsideTemplateLiteral',
  'InComment',
  'InReferenceComment',
  'InNonReferenceComment',
  'InsideJsxElementOrAttribute',
]

export const jsx = {
  any: [
    'WhiteSpaceOnlyJsxText',
    'StringLiteralOrJsxExpression',
    'JsxChild',
    'JsxAttributeLike',
    'IntrinsicJsxName',
    'JsxText',
    'JsxExpression',
  ],
  tag: [
    'JSXTagName',
    'JsxTagNameExpression',
  ],
  fragment: [
    'JsxFragment',
    'JsxOpeningFragment',
    'JsxClosingFragment',

  ],
  element: [
    'JsxElement',
    'JsxOpeningLikeElement',
    'InsideJsxElementOrAttribute',
    'JsxSelfClosingElement',
    'JsxOpeningElement',
    'JsxClosingElement',
  ],
  attribute: [
    'JsxAttribute',
    'JsxAttributes',
    'JsxSpreadAttribute',
  ]
}

export const expression = [
  'OuterExpression',
  'SimpleCopiableExpression',

  'ExpressionNode',
  'InExpressionContext',
  'DeclarationOfFunctionOrClassExpression',
  'AssignmentExpression',
  'ExpressionWithTypeArgumentsInClassExtendsClause',
  'ExpressionWithTypeArgumentsInClassImplementsClause',
  'EntityNameExpression',
  'ArrayLiteralExpression',
  'ObjectLiteralExpression',
  'PropertyAccessExpression',
  'ElementAccessExpression',
  'CallExpression',
  'NewExpression',
  'TaggedTemplateExpression',
  'ParenthesizedExpression',
  'FunctionExpression',
  'DeleteExpression',
  'TypeOfExpression',
  'VoidExpression',
  'AwaitExpression',
  'PrefixUnaryExpression',
  'PostfixUnaryExpression',
  'BinaryExpression',
  'ConditionalExpression',
  'TemplateExpression',
  'YieldExpression',
  'ClassExpression',
  'OmittedExpression',
  'ExpressionWithTypeArguments',
  'AsExpression',
  'NonNullExpression',
  'CallLikeExpression',
  'CallOrNewExpression',
  'LeftHandSideExpression',
  'UnaryExpression',
  'UnaryExpressionWithWrite',
  'Expression',
  'AssertionExpression',
  'PartiallyEmittedExpression',

]

export const quote = [
  'SingleOrDoubleQuote',
  'StringDoubleQuoted',
]

export const parameter = [
  'RestParameter',
  'ParameterPropertyDeclaration',
]

export const rightSide = [
  'InRightSideOfInternalImportEqualsDeclaration',
  'RightSideOfQualifiedName',
  'RightSideOfPropertyAccess',
  'RightSideOfQualifiedNameOrPropertyAccess',
]

export const target = [
  'CallExpressionTarget',
  'NewExpressionTarget',
  'JumpStatementTarget',
]

export const assignment = [
  'ExportAssignment',
  'AssignmentTarget',
  'AssignmentExpression',
  'DestructuringAssignment',
  'PropertyAssignment',
  'ShorthandPropertyAssignment',
  'SpreadAssignment',
]

export const misc = [
  'TypeKeyword',
  'Punctuation',
  'This',
  'DeleteTarget',
  'NodeDescendantOf',
  'Trivia',
  'SyntaxList',
  'Token',
  'ModifierKind',
  'Modifier',
]

export const keyword = [
  'Keyword',
  'ContextualKeyword',
  'NonContextualKeyword',
  'StringANonContextualKeyword',
]

export const literal = {
  any: [
    'LiteralKind',
    'LiteralExpression',
  ],
  number: [
    'NumericLiteral',
  ],
  regexp: [
    'StringOrRegularExpressionOrTemplateLiteral',
  ],
  string: [
    'StringOrRegularExpressionOrTemplateLiteral',
    'StringLiteralOrJsxExpression',
    'StringOrNumericLiteral',
    'StringLiteral',
  ],
  empty: [
    'EmptyObjectLiteral',
    'EmptyArrayLiteral',
  ],
  array: [
    'EmptyArrayLiteral',
    'ArrayLiteralOrObjectLiteralDestructuringPattern',
  ],
  template: [
    'InsideTemplateLiteral',
    'TemplateLiteralKind',
    'TemplateLiteral',
    'StringOrRegularExpressionOrTemplateLiteral',
  ],
  object: [
    'EmptyObjectLiteral',
    'ArrayLiteralOrObjectLiteralDestructuringPattern',
    'ObjectLiteralElement',
    'ObjectLiteralMethod',
    'ObjectLiteralOrClassExpressionMethod',
  ],
  special: [
    'ModuleWithStringLiteralName',
    'LiteralComputedPropertyDeclarationName',
  ]
}

export const $function = [
  'FunctionExpression',
  'AsyncFunction',
  'ArrowFunction',
  'FunctionLike',
  'FunctionLikeDeclaration',
  'FunctionLikeKind',
  'FunctionOrModuleBlock',
]

export const operator = [
  'LogicalOperator',
  'AssignmentOperator',
]

export const $constructor = [
  'NewExpression',
  'AbstractConstructorType',
  'AbstractConstructorSymbol',
]

export const $class = {
  any: [
    'ClassExpression',
    'ClassElement',
    'ClassLike',
  ],
  basedOn: [
    'ExpressionWithTypeArgumentsInClassExtendsClause',
    'ExpressionWithTypeArgumentsInClassImplementsClause',
  ],
  method,
  constructor: $constructor
}

export const access = [
  'AccessibilityModifier',
  'Accessor',
  'MethodOrAccessor',
  'WriteOnlyAccess',
  'WriteAccess',
  'SetAccessor',
  'GetAccessor',
  'LiteralNameOfPropertyDeclarationOrIndexAccess',
  'PropertyAccessOrQualifiedName',
  'ModuleExportsPropertyAccessExpression',
]

export const enums = [
  'DeclarationNameOfEnumOrNamespace',
  'EnumMember',
]

export const binding = [
  'EmptyBindingPattern',
  'ObjectBindingPattern',
  'ArrayBindingPattern',
  'BindingElement',
  'EmptyBindingElement',
  'NamedImportBindings',
]

export const pattern = [
  'ArrayLiteralOrObjectLiteralDestructuringPattern',
  'EmptyBindingPattern',
  'ObjectBindingPattern',
  'ArrayBindingPattern',
  'BindingPattern',
  'AssignmentPattern',
  'ObjectBindingOrAssignmentPattern',
  'ArrayBindingOrAssignmentPattern',
  'BindingOrAssignmentPattern',
]

export const regexp = [
  'RegularExpressionLiteral',
]

export const template = [
  'InTemplateString',
  'NoSubstitutionTemplateLiteral',
  'TemplateHead',
  'TemplateMiddle',
  'TemplateTail',
  'TemplateSpan',
  'TemplateLiteralKind',
  'TemplateMiddleOrTemplateTail',
  'TemplateLiteral',
]

export const signature = [
  'MethodSignature',
  'JSDocIndexSignature',
  'JSDocSignature',
  'PropertySignature',
]

export const element = [
  'SpreadElement',
  'SemicolonClassElement',
  'TypeElement',
  'ObjectLiteralElementLike',
  'ArrayBindingElement',
  'DeclarationBindingElement',
]

export const namespace = [
  'NamespaceExportDeclaration',
  'NamespaceImport',
]

export const clause = [
  'CaseClause',
  'DefaultClause',
  'HeritageClause',
  'CatchClause',
  'ExpressionWithTypeArgumentsInClassExtendsClause',
  'ExpressionWithTypeArgumentsInClassImplementsClause',
]

export const jsdoc = [
  'JSDocNode',
  'JSDocCommentContainingNode',
  'JSDocTag',
  'JSDocNamespaceBody',
  'InJSDoc',
  'JSDocIndexSignature',
  'JSDocSignature',
  'JSDocTypeExpression',
  'JSDocAllType',
  'JSDocUnknownType',
  'JSDocNullableType',
  'JSDocNonNullableType',
  'JSDocOptionalType',
  'JSDocFunctionType',
  'JSDocVariadicType',
  'JSDoc',
  'JSDocAugmentsTag',
  'JSDocParameterTag',
  'JSDocReturnTag',
  'JSDocTypeTag',
  'JSDocTemplateTag',
  'JSDocTypedefTag',
  'JSDocPropertyTag',
  'JSDocPropertyLikeTag',
  'JSDocTypeLiteral',
]











