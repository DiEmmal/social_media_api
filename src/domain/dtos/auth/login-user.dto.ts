export class LoginUserDto {

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) { };

    static create(obj: { [key: string]: any }): { error?: string, dto?: LoginUserDto } {

        if (!obj) return { error: 'Invalid user data' };

        const { email, password } = obj;

        if (!email || !password) {
            return { error: 'All fields are required' };
        };

        return { dto: new LoginUserDto(email, password) };

    };

};