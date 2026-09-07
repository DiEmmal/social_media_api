import type { CreatePostDto, PaginationDto } from "../dtos/index.js";
import type { PostEntity } from "../entities/post.entity.js";
import type { UserEntity } from "../entities/user.entity.js";

export abstract class PostDatasource {
    abstract createPost(dto: CreatePostDto, user: UserEntity): Promise<PostEntity>;
    abstract getPosts(dto: PaginationDto): Promise<{ posts: PostEntity[], total: number}>;
};