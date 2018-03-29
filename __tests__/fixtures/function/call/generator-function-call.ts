function* generator(i: number) {
  yield i
  yield i + 10
}
const gen = generator(10)
gen.next().value

