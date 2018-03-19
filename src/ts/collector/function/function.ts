import { BaseCollector } from './base'

export class FunctionCollector extends BaseCollector {
  collect(node: any) {
    const info = {
      start: node.pos,
      end: node.end,
      name: node.escapedText,
      parameters: node.parameters
    }
    console.log({
      info
    })
  }
}
