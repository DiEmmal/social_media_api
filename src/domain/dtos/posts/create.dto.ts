export class CreatePostDto {

    private constructor(
        public readonly title: string,
        public readonly content: string,
    ) { };

    static create(obj: { [key: string]: any }): { error?: string, dto?: CreatePostDto } {

        if (!obj) return { error: 'Invalid post data' };

        const { title, content, } = obj;

        if (!title || !content) return { error: 'Invalid post data' };

        return { dto: new CreatePostDto(title, content) };

    };

};