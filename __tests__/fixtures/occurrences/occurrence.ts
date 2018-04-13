export function abx(f: any) {
  for (let a in f) {
    for (let b of a) {
      if (!b) continue
      break
    }
    if (a) continue
  }
  undefined
  return () => {
    f
  }
}
