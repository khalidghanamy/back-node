

export const CreateError = (status, message) => {
        const error = new Error();
        error.statusCode = status;
        error.message = message;
        return error;
    }
