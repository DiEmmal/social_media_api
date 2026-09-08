import type { CreatePostDto, PaginationDto, ToggleLikeDto } from "../dtos/index.js";
import type { PostEntity } from "../entities/post.entity.js";
import type { UserEntity } from "../entities/user.entity.js";

export abstract class PostRepository {
    abstract createPost(dto: CreatePostDto, user: UserEntity): Promise<PostEntity>;
    abstract getPosts(dto: PaginationDto): Promise<{ posts: PostEntity[], total: number}>;
    abstract toggleLike(dto: ToggleLikeDto, user: UserEntity): Promise<{ liked: boolean, likes: number, postID: string }>;
};