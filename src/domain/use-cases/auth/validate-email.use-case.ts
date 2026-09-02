import { CustomHttpError } from "../../errors/custom-http.error.js";
import type { UserRepository } from "../../repositories/user.repository.js";
import type { AuthService } from "../../services/index.js";

export class ValidateEmailUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ) { };

    async execute(token: string): Promise<boolean> {

        const { email } = await this.authService.validateJWT(token);

        if (!email) {
            throw CustomHttpError.unauthorized('Invalid token payload');
        }

        return this.userRepository.updateEmailValidationStatus(email);

    };

};