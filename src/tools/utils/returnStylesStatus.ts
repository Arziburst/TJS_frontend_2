export const returnStylesStatus = (status: number) => ({
    'bg-quaternary':  status === 0, // canceled
    'bg-senary':      status === 1, // in processing
    'bg-quinary':     status === 2, // accepted
    'bg-primary-200': status === 3, // closed
});
