export const getValueFromCSSVariable = (
    name: string,
    patternRemovePartOfString?: string,
) => {
    const result = getComputedStyle(document.documentElement)
        .getPropertyValue(`${name}`);

    if (patternRemovePartOfString) {
        return Number(result.replaceAll(patternRemovePartOfString, ''));
    }

    return result;
};
