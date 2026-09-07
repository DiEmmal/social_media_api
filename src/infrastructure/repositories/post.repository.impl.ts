import { CreatePostDto, PostDatasource, PostEntity, UserEntity, PostRepository, PaginationDto } from "../../domain/index.js";

export class PostRepositoryImpl implements PostRepository {

    constructor(
        private readonly postDatasource: PostDatasource
    ) { };

    async createPost(dto: CreatePostDto, user: UserEntity): Promise<PostEntity> {
        return await this.postDatasource.createPost(dto, user);
    };

    async getPosts(dto: PaginationDto): Promise<{ posts: PostEntity[], total: number}> {
        return await this.postDatasource.getPosts(dto);
    };

};