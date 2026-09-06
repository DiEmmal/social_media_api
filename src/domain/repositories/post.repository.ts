import type { CreatePostDto } from "../dtos/index.js";
import type { PostEntity } from "../entities/post.entity.js";
import type { UserEntity } from "../entities/user.entity.js";

export abstract class PostRepository {
    abstract createPost(dto: CreatePostDto, user: UserEntity): Promise<PostEntity>;
    abstract getPosts(): Promise<PostEntity[]>;
};