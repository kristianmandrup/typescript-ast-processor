
import { injectable } from 'inversify'
import { autobind } from 'core-decorators'

@injectable()
@autobind({
  name: 'hello'
})
export class A {
  name: string
}
