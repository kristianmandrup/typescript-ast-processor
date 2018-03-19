import {
  watchFile
} from 'fs'
import {
  createFileEmitter
} from './emit'
import {
  createLogger
} from './logger'

export function watchFiles(options: any) {
  const {
    rootFileNames,
    files,
    services
  } = options

  const logger = createLogger({
    services
  })

  const emitFile = createFileEmitter({
    services,
    logger
  })

  // Now let's watch the files
  rootFileNames.forEach((fileName: string) => {
    // First time around, emit all files
    emitFile(fileName);

    // Add a watch on the file to handle next change
    watchFile(fileName,
      { persistent: true, interval: 250 },
      (curr, prev) => {
        // Check timestamp
        if (+curr.mtime <= +prev.mtime) {
          return;
        }

        // Update the version to signal a change in the file
        files[fileName].version++;

        // write the changes to disk
        emitFile(fileName);
      })
  })
}
