import type { Request, Response } from "express";
import { getUUID } from "../../config/uuid.adapter.js";
import { PostEntity } from "../../domain/entities/post.entity.js";
import { CreatePostDto } from "../../domain/index.js";
import type { PostRepository } from "../../domain/repositories/post.repository.js";
import { CustomHttpError } from "../../domain/errors/custom-http.error.js";

export class PostsController {

    constructor(
        private readonly postRepository: PostRepository,
    ) { };

    private handleError(error: unknown, res: Response) {

        if (error instanceof CustomHttpError) return res.status(error.httpCode).json({ error: error.message });

        return res.status(500).json({ error: 'Internal server error' });

    };

    public getPosts = async (req: Request, res: Response) => {

        return this.postRepository.getPosts()
            .then(posts => res.status(200).json(posts))
            .catch(error => this.handleError(error, res));

    };

    createPost = (req: Request, res: Response) => {

        const { error, dto } = CreatePostDto.create(req.body);

        if (error) return res.status(400).json({ error });

        return this.postRepository.createPost(dto!)
            .then(post => res.status(201).json({ message: 'Post created successfully', post }))
            .catch(error => this.handleError(error, res));
    };

};