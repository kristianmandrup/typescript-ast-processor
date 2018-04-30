class B { }

interface Ix {
  name: string
}

interface Id {
  age: number
}

export class V extends B implements Id {
  age: number
}
