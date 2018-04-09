function* generator(i: number) {
  yield i
  yield i + 10
}
generator(10)

