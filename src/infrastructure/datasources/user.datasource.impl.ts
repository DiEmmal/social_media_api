import { UserDatasource } from "../../domain/datasources/user.datasource.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { CustomHttpError } from "../../domain/errors/custom-http.error.js";
import { CreateUserDto, LoginUserDto } from "../../domain/index.js";
import { UserModel } from "../data/mongo/models/user.model.js";

export class UserDatasourceImpl implements UserDatasource {

    public async register(dto: CreateUserDto): Promise<UserEntity> {

        const { email, password, name } = dto;

        const userExist = await UserModel.findOne({ email });
        if(userExist) throw CustomHttpError.conflict(`User with ${email} already exists`);

        const newUserEntity = new UserEntity(
            name,
            email,
            password,
        );

        const user = await UserModel.create(newUserEntity);

        return UserEntity.fromObject(user);

    };

    public async login(dto: LoginUserDto): Promise<UserEntity> {

        const { email } = dto;

        const user = await UserModel.findOne({ email });

        if(!user) throw CustomHttpError.notFound('User not found');

        return UserEntity.fromObject( user );

    };

    public async validateEmail(email: string): Promise<boolean> {

        const user = await UserModel.findOne({ email });
        if(!user) throw CustomHttpError.notFound('User not found');

        user.emailValidated = true;
        await user.save();

        return true;
    };

    public async findByEmail(email: string): Promise<UserEntity | null> {

        const user = await UserModel.findOne({ email });
        if(!user) return null;
        
        return UserEntity.fromObject(user);

    };

};