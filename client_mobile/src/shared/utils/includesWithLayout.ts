export const includesWithLayout = (input: string, search: string) => {
  const ruLayout = 'йцукенгшщзхъфывапролджэячсмитьбю.';
  const enLayout = "qwertyuiop[]asdfghjkl;'zxcvbnm,./";

  function transformString(
    str: string,
    fromLayout: string,
    toLayout: string,
  ): string {
    return str
      .split('')
      .map((char) => {
        const index = fromLayout.indexOf(char.toLowerCase());
        if (index !== -1) {
          return char === char.toLowerCase()
            ? toLayout[index]
            : toLayout[index].toUpperCase();
        }
        return char;
      })
      .join('');
  }

  const transformedInputToEn = transformString(input, ruLayout, enLayout);
  const transformedSearchToEn = transformString(search, ruLayout, enLayout);
  const transformedInputToRu = transformString(input, enLayout, ruLayout);
  const transformedSearchToRu = transformString(search, enLayout, ruLayout);

  return (
    transformedInputToEn.includes(transformedSearchToEn) ||
    transformedInputToEn.includes(search) ||
    input.includes(search) ||
    input.includes(transformedSearchToRu) ||
    transformedInputToRu.includes(search) ||
    transformedInputToRu.includes(transformedSearchToRu)
  );
};
