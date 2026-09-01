export abstract class AuthService {
    abstract validateEmail(email: string): Promise<boolean>;
    abstract validateJWT(token: string): Promise<boolean>;
    abstract hash(password: string): Promise<string>;
    abstract compare(password: string, hashedPassword: string): Promise<boolean>;
};