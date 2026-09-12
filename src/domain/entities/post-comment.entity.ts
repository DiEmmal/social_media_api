import { getUUID } from "../../config/uuid.adapter.js";

export class PostCommentEntity {

    public id: string;
    public author: { id: string, name: string };
    public postID: string;
    public content: string;

    public constructor(props:
        {
            author: { id: string, name: string },
            postID: string,
            content: string
        }
    ) {
        this.id = getUUID();
        this.author = props.author;
        this.postID = props.postID;
        this.content = props.content;
    };

    public static fromObject(object: any): PostCommentEntity {
        return new PostCommentEntity({
            author: object.author,
            postID: object.postID,
            content: object.content
        });
    }

};