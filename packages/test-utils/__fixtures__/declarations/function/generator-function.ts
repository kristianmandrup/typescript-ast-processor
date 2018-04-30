function* generate(a: number, b: number): IterableIterator<number> {
  yield a + b
  yield a - b
}

