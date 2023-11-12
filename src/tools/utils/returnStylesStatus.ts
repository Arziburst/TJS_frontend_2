// Init
import { STATUS_OF_PRODUCT } from '@/init';

export const returnStylesStatus = (status: number) => ({
    'bg-quaternary':  status === STATUS_OF_PRODUCT.CANCELED,
    'bg-senary':      status === STATUS_OF_PRODUCT.IN_PROGRESS,
    'bg-quinary':     status === STATUS_OF_PRODUCT.ACCEPTED,
    'bg-primary-200': status === STATUS_OF_PRODUCT.CANCELED,
});
