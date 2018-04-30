const Sugar = require('sugar')
// TODO: enable extended mode?
// Sugar.extend()

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
  return s[0].toUpperCase() + s.slice(1)
}

/**
 * string capitalization - first letter - capital, other - lowercase.
 * @param {String} word - Word or sentence.
 */
export const capitalize = (word: string) => {
  // return Sugar.String.capitalize(word)
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`
}

/**
 * Strting camelization - underscores, dividing words replaces to Capital letters
 * sound_text => soundText.
 * @param {String} text - Word or sentence
 * @param {String} separator - delimiter, '_' by default
 */
export const camelize = (text: string, separator = '_') => {
  const words = text.split(separator)
  return [words[0], words.slice(1).map((word) => capitalize(word))].join('')
}

// TODO: use inflection
export function pluralize(name: string): string {
  return Sugar.String.pluralize(name)
  // return /s$/.test(name) ? name : name + 's'
}

export function singularize(name: string): string {
  return Sugar.String.singularize(name)
  // return /s$/.test(name) ? name.slice(-1) : name
}
