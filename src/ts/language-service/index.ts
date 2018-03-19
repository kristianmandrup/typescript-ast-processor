import * as fs from 'fs-extra'
import {
  CompilerOptions,
  createLanguageService,
  createDocumentRegistry,
  MapLike,
  LanguageServiceHost,
  ModuleKind
} from 'typescript'
import {
  createLanguageServiceHost
} from './service-host'
import { watchFiles } from './watch-files';

function watch(rootFileNames: string[], options: CompilerOptions) {
  const files: MapLike<{ version: number }> = {};

  // initialize the list of files
  rootFileNames.forEach(fileName => {
    files[fileName] = { version: 0 };
  });

  // Create the language service host to allow the LS to communicate with the host
  const servicesHost: LanguageServiceHost = createLanguageServiceHost({
    rootFileNames,
    files
  })

  // Create the language service files
  const services = createLanguageService(servicesHost, createDocumentRegistry())

  watchFiles({
    services,
    rootFileNames,
    files,
  })
}

// Initialize files constituting the program as all .ts files in the current directory
const currentDirectoryFiles = fs.readdirSync(process.cwd()).
  filter(fileName => fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === ".ts");

// Start the watcher
watch(currentDirectoryFiles, { module: ModuleKind.CommonJS });
