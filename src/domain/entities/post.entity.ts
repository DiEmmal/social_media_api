import { getUUID } from "../../config/uuid.adapter.js";

export class PostEntity {
    public id: string;
    public title: string;
    public content: string;
    public created_at: Date;
    public authorID: string;
    public authorName: string;
    public likes: number;
    public likedBy: string[];

    constructor(
        title: string,
        content: string,
        userID: string,
        authorName: string,
        likes: number = 0,
        likedBy: string[] = [],
    ) { 
        this.id = getUUID();
        this.title = title;
        this.content = content;
        this.created_at = new Date();
        this.authorID = userID;
        this.authorName = authorName;
        this.likes = likes;
        this.likedBy = likedBy;
    };

    static fromObject(props: { [key: string]: any }): PostEntity {

        const { id, title, content, authorID, authorName, likes, likedBy } = props;

        const post = new PostEntity(
            title,
            content,
            authorID,
            authorName,
            likes,
            likedBy
        );

        post.id = id;
        
        return post;

    };

};