import { CreatePostDto, CustomHttpError, PaginationDto, PostDatasource, PostEntity, UserEntity, } from "../../domain/index.js";
import { PostModel } from "../data/mongo/models/post.model.js";

export class PostDatasourceImpl implements PostDatasource {

    async createPost(dto: CreatePostDto, user: UserEntity): Promise<PostEntity> {

        const newPost = new PostEntity(dto.title, dto.content, user.id, user.name);

        const savedPost = await PostModel.create(newPost);

        return PostEntity.fromObject(savedPost);

    };

    async getPosts(dto: PaginationDto): Promise<{ posts: PostEntity[], total: number }> {
        const { page, limit } = dto;

        try {
            const [total, posts] = await Promise.all([
                PostModel.countDocuments(),
                PostModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
            ]);

            if (!posts || posts.length === 0) return { posts: [], total };

            return {
                posts: posts.map(post => PostEntity.fromObject(post)),
                total
            };

        } catch (error) {
            throw CustomHttpError.internalServerError(`${error}`);
        };

    };

};