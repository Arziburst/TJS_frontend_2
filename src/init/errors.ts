export enum INPUT_VALIDATION_VALUES {
    NAME = 4,
    PASSWORD = 4,
}

export enum ERRORS {
    REQUIRED = 'This field is required',
    INVALID_EMAIL = 'Invalid email format',
    INVALID_PHONE = 'Invalid phone number format',
    NAME_MIN_LENGTH = `Name must be at least ${INPUT_VALIDATION_VALUES.NAME} characters long`,
    PASSWORD_MIN_LENGTH = `Password must be at least ${INPUT_VALIDATION_VALUES.PASSWORD} characters long`,
}
