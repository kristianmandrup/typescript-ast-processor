import * as fs from 'fs-extra'

async function prompt(file: string) {
  return await fs.readFile(file)
}

await prompt('label')

