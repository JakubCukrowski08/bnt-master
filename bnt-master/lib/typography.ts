export function fixOrphans(text: string): string {
  if (!text) return text;
  
  // Wyrażenie regularne wyszukujące krótkie polskie spójniki i przyimki
  // (zarówno małe, jak i wielkie litery) znajdujące się po spacji (lub na początku)
  // i zastępujące spację PO nich na twardą spację (\u00A0).
  const orphansRegex = /(^|\s)(i|a|o|u|w|z|do|na|po|że|się|ze|we|od|ku)\s+/gi;
  
  // Przetwarzamy dopóki są jakieś dopasowania (czasem spójniki występują po sobie, np. "a w ")
  let previousText = '';
  let fixedText = text;
  
  while (previousText !== fixedText) {
    previousText = fixedText;
    fixedText = fixedText.replace(orphansRegex, '$1$2\u00A0');
  }
  
  return fixedText;
}
