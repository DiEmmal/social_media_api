import { CreatePostDto, CustomHttpError, PaginationDto, PostDatasource, PostEntity, ToggleLikeDto, UserEntity, } from "../../domain/index.js";
import { PostModel } from "../data/mongo/models/post.model.js";

export class PostDatasourceImpl implements PostDatasource {

    async createPost(dto: CreatePostDto, user: UserEntity): Promise<PostEntity> {

        const newPost = new PostEntity({
            author: {
                id: user.id,
                name: user.name
            },
            content: dto.content,
            title: dto.title,
        });

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

    async toggleLike(dto: ToggleLikeDto, user: UserEntity): Promise<{ liked: boolean, likes: number, postID: string }> {
        const { postID, liked } = dto;

        try {

            const post = await PostModel.findOne({ id: postID });
            if (!post) throw CustomHttpError.notFound('Post not found');

            const alreadyLiked = post.likedBy.includes(user.id);

            if (liked && !alreadyLiked) {
                post.likedBy.push(user.id);
                post.likes += 1;
            };

            if (!liked && alreadyLiked) {
                post.likedBy = post.likedBy.filter(id => id !== user.id);
                post.likes = post.likedBy.length;
            };

            await post.save();

            return {
                liked: liked && !alreadyLiked ? true : !liked && alreadyLiked ? false : alreadyLiked,
                likes: post.likes,
                postID: post.id
            };

        } catch (error) {
            throw CustomHttpError.internalServerError(`${error}`);
        };
        
    };

};