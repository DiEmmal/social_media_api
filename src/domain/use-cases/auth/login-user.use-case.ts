import { LoginUserDto } from "../../dtos/index.js";
import { UserEntity } from "../../entities/user.entity.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { AuthService } from "../../services/index.js";

export class LoginUserUseCase { 

    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ){};

    async execute(dto: LoginUserDto): Promise<UserEntity> {
        let {email, password} = dto;

        const user = await this.userRepository.login({
            email,
            password
        });
        
        const validated = await this.authService.compare(password, user.password);

        if(!validated) throw ('Invalid password');

        return user;

    };

};