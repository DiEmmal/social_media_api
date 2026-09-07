export class CreateUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ){};

    static create(obj: { [key: string]: any }): { error?: string, dto?: CreateUserDto } {

        if(!obj) return { error: 'Invalid data' };

        const { name, email, password } = obj;

        if(!name) return { error: 'User name is required' };
        if(typeof name !== 'string') return { error: 'User name must be a string' };
        if(name.length < 3) return { error: 'User name must be at least 3 characters long' };

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(typeof email !== 'string') return { error: 'User email must be a string' };
        if(!email) return { error: 'User email is required' };
        if(!emailRegex.test(email)) return { error: 'User email is invalid' };

        if(typeof password !== 'string') return { error: 'User password must be a string' };
        if(!password) return { error: 'User password is required' };
        if(password.length < 6) return { error: 'User password must be at least 6 characters long' };


        return { dto: new CreateUserDto(name, email, password) };

    };

};