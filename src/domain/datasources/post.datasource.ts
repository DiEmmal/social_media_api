import type { CreatePostDto } from "../dtos/index.js";
import type { PostEntity } from "../entities/post.entity.js";

export abstract class PostDatasource {
    abstract createPost(dto: CreatePostDto): Promise<PostEntity>;
    abstract getPosts(): Promise<PostEntity[]>;
};