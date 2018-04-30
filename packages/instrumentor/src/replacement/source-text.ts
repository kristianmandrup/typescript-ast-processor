export function createSourceTextReplacement(
  start: number,
  end: number,
  text = '',
) {
  return new SourceTextReplacement(start, end, text)
}

/**
 * Source text replacement using character positions
 */
export class SourceTextReplacement {
  /**
   * Create source text replacement
   * @constructor
   * @param start
   * @param end
   * @param text
   */
  constructor(
    readonly start: number,
    readonly end: number,
    readonly text = '',
  ) {}

  /**
   * Insert code at character index
   * @param pos
   * @param text
   */
  public static insert(pos: number, text: string): SourceTextReplacement {
    return createSourceTextReplacement(pos, pos, text)
  }

  /**
   * Insert number of characters starting at character index
   * @param start
   * @param end
   */
  public static delete(start: number, end: number): SourceTextReplacement {
    return createSourceTextReplacement(start, end, '')
  }
}

/**
 * Apply list of replacements in source order using replacement positions
 * Directly works on source text using character indexing
 * In most cases better to instrument AST and then emit as code
 * @param source
 * @param replacements
 */
export function applyReplacements(
  source: string,
  replacements: SourceTextReplacement[],
) {
  replacements = replacements.sort(
    (r1, r2) => (r2.end !== r1.end ? r2.end - r1.end : r2.start - r1.start),
  )
  for (const replacement of replacements) {
    source =
      source.slice(0, replacement.start) +
      replacement.text +
      source.slice(replacement.end)
  }
  return source
}
