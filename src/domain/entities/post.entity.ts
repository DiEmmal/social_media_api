import { getUUID } from "../../config/uuid.adapter.js";

export class PostEntity {
    public id: string;
    public title: string;
    public content: string;
    public author: string;
    public created_at: Date;

    constructor(
        title: string,
        content: string,
        author: string,
    ) { 
        this.id = getUUID();
        this.title = title;
        this.content = content;
        this.author = author;
        this.created_at = new Date();
    };

    static fromObject(props: { [key: string]: any }): PostEntity {

        const { id, title, content, author } = props;

        const post = new PostEntity(
            title,
            content,
            author
        );

        post.id = id;
        
        return post;

    };

};