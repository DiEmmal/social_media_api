import { CreateUserDto } from "../../dtos/index.js";
import { UserEntity } from "../../entities/user.entity.js";
import { CustomHttpError } from "../../errors/custom-http.error.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { AuthService } from "../../services/index.js";

export class RegisterUserUseCase { 

    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ){};

    async execute(dto: CreateUserDto): Promise<UserEntity> {
        let {email, name, password} = dto;
        
        const existingUser = await this.userRepository.findByEmail(email);
        
        if(existingUser) throw CustomHttpError.conflict(`User with ${email} already exists`);
        
        await this.authService.sendValidationEmailLink(email);

        password = await this.authService.hash(password);
        
        const user = await this.userRepository.register({
            email,
            name,
            password
        });

        return user;

    };

};