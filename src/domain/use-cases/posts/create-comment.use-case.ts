import type { CreateCommentDto } from "../../dtos/index.js";
import type { UserEntity } from "../../entities/user.entity.js";
import type { PostRepository } from "../../repositories/post.repository.js";

export class CreateCommentUseCase { 
    constructor(
        private readonly postRepository: PostRepository,
    ) { };

    public async execute(dto: CreateCommentDto, user: UserEntity){
        return this.postRepository.createComment(dto, user);
    };

};