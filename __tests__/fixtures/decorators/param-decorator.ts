import { injectable, inject } from 'inversify'

const TYPE = {
  Dom: Symbol.for("Dom"),
  DomUi: Symbol.for("DomUi")
};

@injectable()
export class DomUi {
  public dom: any;
  public name: string;
  constructor(
    @inject(TYPE.Dom) dom: any
  ) {
    this.dom = dom;
    this.name = "DomUi";
  }
}
