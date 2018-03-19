import * as ts from 'typescript'
import { BaseReplacer } from './base'
import { SrcFile } from '../../src-file'

export class AddTypesToParamsReplacer extends BaseReplacer {
  constructor(public srcFile: SrcFile) {
    super(srcFile)
  }


  replaceNodes(nodes: any) {
    const params: ts.ParameterDeclaration[] = nodes.params
    const node = nodes.node

    const instrumentExpr = `$_$twiz(${params.join(',')});`;

    // const preamble = `
    //     get ${name}() { return this._twiz_private_${name}; }
    //     set ${name}(value: any) { ${instrumentExpr} this._twiz_private_${name} = value; }
    // `;
    // // we need to remove any readonly modifiers, otherwise typescript will not let us update
    // // our _twiz_private_... variable inside the setter.
    // for (const modifier of node.modifiers || []) {
    //   if (modifier.kind === ts.SyntaxKind.ReadonlyKeyword) {
    //     replacements.push(Replacement.delete(modifier.getStart(), modifier.getEnd()));
    //   }
    // }

    // const instrumentExpr = `$_$twiz(${params.join(',')})`;


    const isShortArrow = true

    if (isShortArrow) {
      this.replace(node.body.getStart(), `(${instrumentExpr},`)
      this.replace(node.body.getEnd(), `)`)
    } else {
      this.replace(node.body.getStart() + 1, `${instrumentExpr};`)
    }
  }
}

