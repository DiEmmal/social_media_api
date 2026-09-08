import type { ToggleLikeDto } from "../../dtos/index.js";
import type { UserEntity } from "../../entities/user.entity.js";
import type { PostRepository } from "../../repositories/post.repository.js";

export class ToggleLikeUseCase {

    public constructor(
        private readonly postRepository: PostRepository,
    ){ };

    public async execute(dto: ToggleLikeDto, user: UserEntity): Promise<{ liked: boolean, likes: number, postID: string }> {
        return this.postRepository.toggleLike(dto, user);
    };

};
