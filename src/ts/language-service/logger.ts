import {
  LanguageService,
  flattenDiagnosticMessageText
} from 'typescript'

export function createLogger(options: any) {
  return new Logger(options)
}

export class Logger {
  services: LanguageService

  constructor(options: any) {
    this.services = options.services
  }

  errors(fileName: string) {
    const services = this.services

    let allDiagnostics = services.getCompilerOptionsDiagnostics()
      .concat(services.getSyntacticDiagnostics(fileName))
      .concat(services.getSemanticDiagnostics(fileName));

    allDiagnostics.forEach((diagnostic) => {
      let message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        console.log(`  Error ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
      }
      else {
        console.log(`  Error: ${message}`);
      }
    });
  }
}

