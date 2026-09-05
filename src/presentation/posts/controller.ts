import type { Request, Response } from "express";
import { getUUID } from "../../config/uuid.adapter.js";
import { PostEntity } from "../../domain/entities/post.entity.js";
import { CreatePostDto } from "../../domain/index.js";

export class PostsController {

    contructor() { };

    public getPosts = async (req: Request, res: Response) => {

        const posts = [{
            id: getUUID(),
            title: 'Post 1',
            content: 'This is the first post',
            author: 'DiEmmal',
        },
        {
            id: getUUID(),
            title: 'Post 2',
            content: 'This is the second post',
            author: 'DiEmmal',
        }].map(post => PostEntity.fromObject(post));

        return res.status(200).json(posts)

    };

    createPost = (req: Request, res: Response) => {

        const { error, dto } = CreatePostDto.create(req.body);

        if(error) return res.status(400).json({ error });

        const post = new PostEntity(dto!.title, dto!.content, dto!.author)

        return res.status(201).json({ message: 'Post created successfully', post });
    };

};