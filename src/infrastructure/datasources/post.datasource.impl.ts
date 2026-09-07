import { CreatePostDto, PostDatasource, PostEntity, UserEntity,  } from "../../domain/index.js";
import { PostModel } from "../data/mongo/models/post.model.js";

export class PostDatasourceImpl implements PostDatasource {

    async createPost(dto: CreatePostDto, user: UserEntity): Promise<PostEntity> {
        
        const newPost = new PostEntity(dto.title, dto.content, user.id, user.name);

        const savedPost = await PostModel.create(newPost);

        return PostEntity.fromObject(savedPost);

    };

    async getPosts(): Promise<PostEntity[]> {
        
        const posts = await PostModel.find();

        return posts.map(post => PostEntity.fromObject(post));

    };

};