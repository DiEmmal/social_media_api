import type { PaginationDto } from "../../dtos/index.js";
import type { PostEntity } from "../../entities/post.entity.js";
import type { PostRepository } from "../../repositories/post.repository.js";

export class GetPostsUseCase {

    public constructor(
        private readonly postRepository: PostRepository,
    ){};

    public async execute(dto: PaginationDto): Promise<{ posts: PostEntity[], total: number}> {
        return this.postRepository.getPosts(dto);
    };

};