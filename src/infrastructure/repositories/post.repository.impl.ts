import { CreatePostDto, PostDatasource, PostEntity, UserEntity, PostRepository } from "../../domain/index.js";

export class PostRepositoryImpl implements PostRepository {

    constructor(
        private readonly postDatasource: PostDatasource
    ) { };

    async createPost(dto: CreatePostDto, user: UserEntity): Promise<PostEntity> {
        return await this.postDatasource.createPost(dto, user);
    };

    async getPosts(): Promise<PostEntity[]> {
        return await this.postDatasource.getPosts();
    };

};