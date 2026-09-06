import type { PostEntity } from "../../entities/post.entity.js";
import type { PostRepository } from "../../repositories/post.repository.js";

export class GetPostsUseCase {

    public constructor(
        private readonly postRepository: PostRepository,
    ){};

    public async execute(): Promise<PostEntity[]> {
        return this.postRepository.getPosts();
    };

};