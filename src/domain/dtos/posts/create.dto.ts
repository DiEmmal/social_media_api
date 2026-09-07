export class CreatePostDto {

    private constructor(
        public readonly title: string,
        public readonly content: string,
    ) { };

    static create(obj: { [key: string]: any }): { error?: string, dto?: CreatePostDto } {

        if (!obj) return { error: 'Invalid post data' };

        const { title, content, } = obj;

        if(typeof title !== 'string') return { error: 'Title must be a string' };
        if(!title || title === '') return { error: 'Title cannot be empty' };
        if(title.length > 100) return { error: 'Title cannot be longer than 100 characters' };

        if(typeof content !== 'string') return { error: 'Content must be a string' };
        if(!content || content === '') return { error: 'Content cannot be empty' };
        if(content.length > 1000) return { error: 'Content cannot be longer than 1000 characters' };

        return { dto: new CreatePostDto(title, content) };

    };

};