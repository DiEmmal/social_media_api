import { CreatePostDto, CustomHttpError, PostRepository, GetPostsUseCase, CreatePostUseCase, PaginationDto } from "../../domain/index.js";
import type { Request, Response } from "express";

export class PostsController {

    constructor(
        private readonly postRepository: PostRepository,
    ) { };

    private handleError(error: unknown, res: Response) {

        if (error instanceof CustomHttpError) return res.status(error.httpCode).json({ error: error.message });

        return res.status(500).json({ error: 'Internal server error' });

    };

    public getPosts = async (req: Request, res: Response) => {
        const { page, limit } = req.query;
        const { error, dto } = PaginationDto.create({ page: Number(page), limit: Number(limit) });

        if(error) return res.status(400).json({ error });

        const getPostsUseCase = new GetPostsUseCase(this.postRepository);

        return getPostsUseCase.execute(dto!)
            .then(posts => res.status(200).json(posts))
            .catch(error => this.handleError(error, res));

    };

    createPost = (req: Request, res: Response) => {
        const user = req.body.user;

        const { error, dto } = CreatePostDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const createPostUseCase = new CreatePostUseCase(this.postRepository);

        return createPostUseCase.execute(dto!, user)
            .then(post => res.status(201).json({ message: 'Post created successfully', post }))
            .catch(error => this.handleError(error, res));
    };

};