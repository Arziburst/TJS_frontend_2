// Constants
import { LOCAL_STORAGE } from '@/init';

const set = (key: LOCAL_STORAGE, value: unknown) => localStorage.setItem(key, JSON.stringify(value));

const get = (key: LOCAL_STORAGE): any => {
    const getItem = localStorage.getItem(key);

    if (getItem) {
        return JSON.parse(getItem);
    }

    return null;
};

export const ls = {
    set,
    get,
};
