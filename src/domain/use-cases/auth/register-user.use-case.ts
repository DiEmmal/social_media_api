import { CreateUserDto } from "../../dtos/index.js";
import { UserEntity } from "../../entities/user.entity.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { AuthService } from "../../services/index.js";

export class RegisterUserUseCase { 

    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ){};

    async execute(dto: CreateUserDto): Promise<UserEntity> {
        let {email, name, password} = dto;
        
        password = await this.authService.hash(password);
        
        const user = await this.userRepository.register({
            email,
            name,
            password
        });

        return user;

    };

};