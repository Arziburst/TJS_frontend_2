// Types
type SCREENS = {
    [key: string]: string
};

export enum SCREENS_NUMBER {
    SM = 640,
    MD = 768,
    SB = 1024, // for SideBar
}

export const screensUnit = 'px';


export const screens: SCREENS = {
    sb: SCREENS_NUMBER.SB + screensUnit,
};
