export const setValueToCSSVariable = (name: string, value: string) => {
    document.documentElement.style.setProperty(`${name}`, value);
};
