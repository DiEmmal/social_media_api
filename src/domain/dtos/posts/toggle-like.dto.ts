export class ToggleLikeDto {

    private constructor(
        public readonly postID: string,
        public readonly liked: boolean,
    ) { };

    static create(obj: { [key: string]: any }): { error?: string, dto?: ToggleLikeDto } {

        if (!obj) return { error: 'Invalid like data' };

        const { postID, liked } = obj;

        if (typeof postID !== 'string') return { error: 'postID is required' };
        if(postID.trim().length === 0) return { error: 'postID cannot be empty' };

        if (typeof liked !== 'boolean') return { error: 'liked must be a boolean' };

        return { dto: new ToggleLikeDto(postID, liked) };

    };

};
