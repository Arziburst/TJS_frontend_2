// Types
import {
    UseTranslationOptions,
    UseTranslationResponse,
    useTranslation,
} from 'react-i18next';

export const useCustomTranslation = (
    ns?: any,
    options?: UseTranslationOptions<undefined> | undefined,
): UseTranslationResponse<any, undefined> => {
    const { t, ...other } = useTranslation(ns, options);

    const customT = (...params: any) => {
        const result = t(...params);

        if (!result || (result && result.length < 1)) {
            throw new Error(`${useCustomTranslation.name}: translation for "${params[ 0 ]}" not found!`);
        }

        return result;
    };

    return { t: customT, ...other } as UseTranslationResponse<any, undefined>;
};
