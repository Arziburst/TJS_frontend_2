
// Tools
import { ControlledError } from './controlledError';

// Types
import { FetchOptions } from './makeRequest';

export const customFetch = async <SuccessData, ErrorData = unknown>(fetchOptions: FetchOptions) => {
    const response = await fetchOptions.fetch();

    if (fetchOptions.successStatusCode && (response.status !== fetchOptions.successStatusCode)) {
        let errorData: ErrorData | null = null;

        try {
            errorData = await response.json();
        } catch {
            throw new ControlledError({ message: 'Parsing error' });
        }

        throw new ControlledError({
            message:    'Parsed error',
            statusCode: response.status,
            data:       errorData,
        });
    }

    if (fetchOptions.isNoData) {
        return { ...response, data: null };
    }

    const successData: SuccessData = await response.json();

    return successData;
};
