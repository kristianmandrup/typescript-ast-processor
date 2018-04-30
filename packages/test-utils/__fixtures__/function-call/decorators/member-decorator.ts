import { autobind } from 'core-decorators'

import 'reflect-metadata'

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
export class A {
  @format('blue')
  label: string

  @autobind()
  handleClick() {
  }
}
