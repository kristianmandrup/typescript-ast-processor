function createTypeCheckName(name: string) {
  return `is${capitalizeFirst(name)}`
}

export function nodeTypeCheckName(name: string) {
  return /^is[A-Z]/.test(name) ? name : createTypeCheckName(name)
}

export function lowercaseFirst(name: string) {
  return name[0].toLowerCase() + name.slice(1)
}

export function capitalizeFirst(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}
