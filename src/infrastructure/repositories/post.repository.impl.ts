import { CreatePostDto, PostDatasource, PostEntity, UserEntity, PostRepository, PaginationDto, ToggleLikeDto } from "../../domain/index.js";

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

    async toggleLike(dto: ToggleLikeDto, user: UserEntity): Promise<{ liked: boolean, likes: number, postID: string }> {
        return await this.postDatasource.toggleLike(dto, user);
    };

};