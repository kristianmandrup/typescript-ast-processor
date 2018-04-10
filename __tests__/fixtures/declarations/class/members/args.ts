export class A {
  name: string

  displayName(prefix: string, postfix: string, index?: number): string {
    return prefix + this.name + postfix + index || ''
  }
}
