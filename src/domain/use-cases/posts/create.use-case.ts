import type { CreatePostDto } from "../../dtos/index.js";
import { PostEntity } from "../../entities/post.entity.js";
import type { UserEntity } from "../../entities/user.entity.js";
import type { PostRepository } from "../../repositories/post.repository.js";

export class CreatePostUseCase {

    public constructor(
        private readonly postRepository: PostRepository,
    ){};

    public async execute(dto: CreatePostDto, user: UserEntity): Promise<PostEntity> {
        return this.postRepository.createPost(dto, user);
    };

};