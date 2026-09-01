export class LoginUserDto {

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) { };

    static create(obj: { [key: string]: any }): { error?: string, dto?: LoginUserDto } {

        if (!obj) return { error: 'Invalid user data' };

        const { email, password } = obj;

        if(!email) return { error: 'User email is required' };
        if(!password) return { error: 'User password is required' };

        return { dto: new LoginUserDto(email, password) };

    };

};