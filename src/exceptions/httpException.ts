class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: any;


    constructor(message: string, errorCode: any, statusCode: number, error: any) {
        super(message)

        this.message    = message;
        this.errorCode  = errorCode;
        this.statusCode = statusCode;
        this.errors     = error;
    }
}

export enum ErrorCodes {
    USER_NOT_FOUMD      = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD  = 1003,
}
