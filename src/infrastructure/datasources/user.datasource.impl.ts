import { UserDatasource } from "../../domain/datasources/user.datasource.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { CreateUserDto, LoginUserDto } from "../../domain/index.js";
import { userModel } from "../data/mongo/models/user.model.js";

export class UserDatasourceImpl implements UserDatasource {

    public async register(dto: CreateUserDto): Promise<UserEntity> {

        const { email, password, name } = dto;

        const newUserEntity = new UserEntity(
            name,
            email,
            password,
        );

        const user = await userModel.create(newUserEntity);

        return UserEntity.fromObject(user);

    };

    public async login(dto: LoginUserDto): Promise<UserEntity> {

        const { email } = dto;

        const user = await userModel.findOne({ email });

        if(!user) throw ('User not found');

        return UserEntity.fromObject( user );

    };

};