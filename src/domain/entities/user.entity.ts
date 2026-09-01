import { getUUID } from "../../config/index.js";

export class UserEntity {
    public id: string;
    public name: string;
    public email: string;
    public password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = getUUID();
    };

    public static fromObject(user: { [key: string]: any }): UserEntity {

        const { name, email, password, id } = user;

        if (!name || !email || !password) {
            throw new Error("Invalid user object");
        };

        const newUserEntity = new UserEntity(
            name,
            email,
            password
        );
        
        newUserEntity.id = id;

        return newUserEntity;

    };

};