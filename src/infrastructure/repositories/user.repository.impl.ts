import { UserDatasource } from "../../domain/datasources/user.datasource.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { CreateUserDto, LoginUserDto } from "../../domain/index.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";

export class UserRepositoryImpl implements UserRepository {

    constructor(private readonly userDatasource: UserDatasource) { };

    async login(dto: LoginUserDto): Promise<UserEntity> {
        return this.userDatasource.login(dto);
    };

    async register(dto: CreateUserDto): Promise<UserEntity> {
        return this.userDatasource.register(dto);
    };

    async updateEmailValidationStatus(email: string): Promise<boolean> {
        return this.userDatasource.validateEmail(email);
    };

};