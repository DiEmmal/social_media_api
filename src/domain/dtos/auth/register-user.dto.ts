export class CreateUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ){};

    static create(obj: { [key: string]: any }): { error?: string, dto?: CreateUserDto } {

        if(!obj) return { error: 'Invalid user data' };

        const { name, email, password } = obj;

        if(!name || !email || !password) {
            return { error: 'All fields are required' };
        };

        return { dto: new CreateUserDto(name, email, password) };

    };

};