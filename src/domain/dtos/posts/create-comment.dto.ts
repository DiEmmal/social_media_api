export class CreateCommentDto {

    private constructor(
        public readonly postID: string,
        public readonly comment: string,
    ) { };

    static create(obj: { [key: string]: any }): { error?: string, dto?: CreateCommentDto } {

        if (!obj) return { error: 'Invalid comment data' };

        const { postID, content } = obj;

        if (typeof postID !== 'string') return { error: 'postID is required' };
        if(postID.trim().length === 0) return { error: 'postID cannot be empty' };

        if(content.trim().length === 0) return { error: 'comment cannot be empty' };

        return { dto: new CreateCommentDto(postID, content) };

    };

};
