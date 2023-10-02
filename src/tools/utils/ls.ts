// Constants
import { LOCAL_STORAGE } from '@/init';

const set = (key: LOCAL_STORAGE, value: string) => {
    localStorage.setItem(key, value);
};

const get = (key: LOCAL_STORAGE) => {
    localStorage.getItem(key);
};

export const ls = {
    set,
    get,
};
