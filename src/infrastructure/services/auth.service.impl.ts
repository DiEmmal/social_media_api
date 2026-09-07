import bcrypt from "bcryptjs";
import { AuthService, EmailService, CustomHttpError } from "../../domain/index.js";
import { envs } from "../../config/index.js";
import jwt from "jsonwebtoken";

export class AuthServiceImpl implements AuthService {

    constructor(
        private readonly emailService: EmailService,
    ) { };

    async validateJWT(token: string): Promise<{ validated: boolean, email: string }> {

        const payload = await new Promise((resolve, reject) => {

            jwt.verify(token, envs.JWT_SECRET, {}, (err, decoded) => {
                if (err) return reject(CustomHttpError.unauthorized('Invalid token'));

                return resolve(decoded);
            });

        });

        if (!payload) throw CustomHttpError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomHttpError.unauthorized('Email not in token payload');

        return { validated: true, email };

    };

    async generateJWT(payload: object, duration: number = 3600 * 24): Promise<string> {

        return new Promise((resolve, reject) => {

            jwt.sign(payload, envs.JWT_SECRET, { expiresIn: duration }, (err, token) => {
                if (err) return reject(CustomHttpError.internalServerError('Error generating token'));

                if (token) return resolve(token);
            });

        });

    };

    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    };

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    };

    async sendValidationEmailLink(email: string): Promise<void> {

        const token = await this.generateJWT({ email }, 600);
        if (!token) throw CustomHttpError.internalServerError('Error generating token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <div style="margin: 0; padding: 32px 16px; background-color: #f4f6f8; font-family: Arial, sans-serif; color: #263238;">
                <div style="max-width: 560px; margin: 0 auto; padding: 32px; background-color: #ffffff; border: 1px solid #e1e5e8; border-radius: 8px;">
                    <h1 style="margin: 0 0 16px; font-size: 24px; color: #1f2933;">Confirm your email</h1>
                    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">
                        ${email}
                    </p>
                    <a href="${link}" style="display: inline-block; padding: 12px 20px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
                        Validate email
                    </a>
                    <p style="margin: 24px 0 0; font-size: 13px; line-height: 1.5; color: #667085;">
                        If button does not work, paste this link on your browser:<br>
                        <a href="${link}" style="color: #2563eb; word-break: break-word;">${link}</a>
                    </p>
                </div>
            </div>
        `;

        const options = {
            to: email,
            subject: 'Confirm your email',
            html: html,
        };

        const isSent = await this.emailService.sendEmail(options);

        if (!isSent) throw CustomHttpError.internalServerError('Error sending email');

    };
};