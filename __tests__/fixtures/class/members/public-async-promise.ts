export class A {
  name: string

  public async displayName(): Promise<string> {
    return await this.name
  }
}
