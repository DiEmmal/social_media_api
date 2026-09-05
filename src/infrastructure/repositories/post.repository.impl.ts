import type { PostDatasource } from "../../domain/datasources/post.datasource.js";
import type { PostEntity } from "../../domain/entities/post.entity.js";
import type { CreatePostDto } from "../../domain/index.js";
import type { PostRepository } from "../../domain/repositories/post.repository.js";

export class PostRepositoryImpl implements PostRepository {

    constructor(
        private readonly postDatasource: PostDatasource
    ) {};

    async createPost(dto: CreatePostDto): Promise<PostEntity> {
        return await this.postDatasource.createPost(dto);
    };

    async getPosts(): Promise<PostEntity[]> {
        return await this.postDatasource.getPosts();
    };
    
};