// Core
import i18next, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

// Configs
import translationEn from './configs/en.json';
import translationUk from './configs/uk.json';
import translationRu from './configs/ru.json';

// Constants
import { LOCAL_STORAGE } from '../constants';

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

const initialLng = localStorage.getItem(LOCAL_STORAGE.LANGUAGE) || navigator.language;

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
