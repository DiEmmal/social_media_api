import type { Request, Response } from "express";
import { CreatePostDto } from "../../domain/index.js";
import type { PostRepository } from "../../domain/repositories/post.repository.js";
import { CustomHttpError } from "../../domain/errors/custom-http.error.js";
import { GetPostsUseCase } from "../../domain/use-cases/posts/get.use-case.js";
import { CreatePostUseCase } from "../../domain/use-cases/posts/create.use-case.js";

export class PostsController {

    constructor(
        private readonly postRepository: PostRepository,
    ) { };

    private handleError(error: unknown, res: Response) {

        if (error instanceof CustomHttpError) return res.status(error.httpCode).json({ error: error.message });

        return res.status(500).json({ error: 'Internal server error' });

    };

    public getPosts = async (req: Request, res: Response) => {

        const getPostsUseCase = new GetPostsUseCase(this.postRepository);

        return getPostsUseCase.execute()
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