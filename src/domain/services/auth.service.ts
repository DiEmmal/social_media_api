export abstract class AuthService {
    abstract validateJWT(token: string): Promise<{ validated: boolean, email: string}>;
    abstract hash(password: string): Promise<string>;
    abstract generateJWT(payload: object, duration?: number): Promise<string>;
    abstract compare(password: string, hashedPassword: string): Promise<boolean>;
    abstract sendValidationEmailLink(email: string,): Promise<void>;
};