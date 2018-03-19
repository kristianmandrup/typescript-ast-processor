import {
  writeFileSync
} from 'fs-extra'

interface IOutputFile {
  name: string,
  text: string
}

export function createFileEmitter(options: any) {
  const {
    services,
    logger
  } = options

  return function emitFile(fileName: string) {
    let output = services.getEmitOutput(fileName)

    if (!output.emitSkipped) {
      console.log(`Emitting ${fileName}`)
    }
    else {
      console.log(`Emitting ${fileName} failed`)
      logger.errors(fileName)
    }

    output.outputFiles.forEach((outputFile: IOutputFile) => {
      writeFileSync(outputFile.name, outputFile.text, 'utf8')
    })
  }
}
