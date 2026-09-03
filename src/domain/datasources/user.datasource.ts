import { CreateUserDto, LoginUserDto } from "../dtos/index.js";
import { UserEntity } from "../entities/user.entity.js";

export abstract class UserDatasource {
    abstract register(dto: CreateUserDto): Promise<UserEntity>;
    abstract login(dto: LoginUserDto): Promise<UserEntity>;
    abstract validateEmail(email: string): Promise<boolean>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
};