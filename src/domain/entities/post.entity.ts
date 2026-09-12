import { getUUID } from "../../config/uuid.adapter.js";

export class PostEntity {
    public id: string;
    public title: string;
    public content: string;
    public created_at: Date;
    public author: { id: string, name: string };
    public likes: number;
    public likedBy: string[];

    constructor(props:
        {
            title: string,
            content: string,
            author: { id: string, name: string },
            likes?: number,
            likedBy?: string[]
        }
    ) {
        this.id = getUUID();
        this.title = props.title;
        this.content = props.content;
        this.created_at = new Date();
        this.author = { id: props.author.id, name: props.author.name };
        this.likes = props.likes ?? 0;
        this.likedBy = props.likedBy ?? [];
    };

    static fromObject(props: { [key: string]: any }): PostEntity {

        const { id, title, content, author, likes, likedBy } = props;

        const post = new PostEntity({
            title,
            content,
            author,
            likes,
            likedBy,
        });

        post.id = id;

        return post;

    };

};