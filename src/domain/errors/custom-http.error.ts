export class CustomHttpError extends Error {

    private constructor(
        public readonly message: string,
        public readonly httpCode: number,
    ) {
        super(message);
    };

    static badRequest(message: string) {
        return new CustomHttpError(message, 400);
    };

    static unauthorized(message: string) {
        return new CustomHttpError(message, 401);
    };

    static forbidden(message: string) {
        return new CustomHttpError(message, 403);
    };

    static notFound(message: string) {
        return new CustomHttpError(message, 404);
    };

    static internalServerError(message: string) {
        return new CustomHttpError(message, 500);
    };

    static conflict(message: string) {
        return new CustomHttpError(message, 409);
    };

};