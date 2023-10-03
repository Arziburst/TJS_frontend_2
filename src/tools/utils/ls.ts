// Constants
import { LOCAL_STORAGE } from '@/init';

const set = (key: LOCAL_STORAGE, value: unknown) => localStorage.setItem(key, JSON.stringify(value));

const get = (key: LOCAL_STORAGE): any => localStorage.getItem(key);

export const ls = {
    set,
    get,
};
