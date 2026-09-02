import { envs } from "../../config/index.js";
import { EmailService, type SendEmailOptions } from "../../domain/index.js";
import nodemailer from "nodemailer";

export class EmailServiceImpl extends EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { to, subject, html } = options;

        try {

            await this.transporter.sendMail({
                to,
                subject,
                html: html,
            });

            return true;
        } catch (error) {
            return false;
        };
    };

};