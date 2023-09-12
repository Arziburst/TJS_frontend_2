// Types
type Fonts = {
    family: {
        [key: string]: string;
    };
};

export const fonts: Fonts = {
    family: {
        primary:   'TT Ricordi Allegria Trl',
        secondary: 'Raleway',
        tertiary:  '\'Inter\', sans-serif',
        // quaternary: 'SF Pro Text', // todo need?
    },
};

// convert TTF to WEB2 >>> https://cloudconvert.com/ttf-to-woff2
