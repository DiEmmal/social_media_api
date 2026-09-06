import { getUUID } from "../../config/uuid.adapter.js";

export class PostEntity {
    public id: string;
    public title: string;
    public content: string;
    public created_at: Date;
    public authorID: string;
    public authorName: string;

    constructor(
        title: string,
        content: string,
        userID: string,
        authorName: string,
    ) { 
        this.id = getUUID();
        this.title = title;
        this.content = content;
        this.created_at = new Date();
        this.authorID = userID;
        this.authorName = authorName;
    };

    static fromObject(props: { [key: string]: any }): PostEntity {

        const { id, title, content, authorID, authorName } = props;

        const post = new PostEntity(
            title,
            content,
            authorID,
            authorName
        );

        post.id = id;
        
        return post;

    };

};