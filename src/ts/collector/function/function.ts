import { DataCollector } from '../base'

export class FunctionCollector extends DataCollector {
  collect(node: any) {
    const info = {
      start: node.pos,
      end: node.end,
      name: node.escapedText,
      parameters: node.parameters
    }
    this.log('collected', {
      info
    })
  }
}
