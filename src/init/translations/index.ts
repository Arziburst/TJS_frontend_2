// Core
import i18next, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

// Configs
import translationEn from './configs/en.json';
import translationUk from './configs/uk.json';
import translationRu from './configs/ru.json';

// Constants
import { LOCAL_STORAGE } from '../constants';

// Tools
import { ls } from '@/tools/utils';

const resources = {
    en: {
        translation: translationEn,
    },
    uk: {
        translation: translationUk,
    },
    ru: {
        translation: translationRu,
    },
};

const initialLng = ls.get(LOCAL_STORAGE.LANGUAGE) || navigator.language.slice(0, 2);

void use(initReactI18next).init({
    resources,
    lng:           initialLng,
    fallbackLng:   'uk',
    keySeparator:  '.',
    interpolation: {
        escapeValue: false,
    },
});

export default i18next;
