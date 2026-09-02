import { CreateUserDto, LoginUserDto } from "../dtos/index.js";
import { UserEntity } from "../entities/user.entity.js";

export abstract class UserRepository {
    abstract register(dto: CreateUserDto): Promise<UserEntity>;
    abstract login(dto: LoginUserDto): Promise<UserEntity>;
    abstract updateEmailValidationStatus(email: string): Promise<boolean>;
};