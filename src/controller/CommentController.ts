import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Users from '../entity/Users';
import Episode from '../entity/Episode';
import Comment from '../entity/Comment';

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    const comment = await getRepository(Comment).findOne(id);

    if (!comment) {
        return res.status(400).json({ error: `Comment ${id} does not exist` });
    }

    try {
        await getRepository(Comment).remove(comment);
        return res.status(204).json();
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function show(req: Request, res: Response) {
    const { episodeId } = req.params;

    try {
        const episode = await getRepository(Episode).findOne(episodeId);

        if (!episode) {
            return res
                .status(400)
                .json({ error: `Episode ${episodeId} does not exist` });
        }

        const comments = await getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.episode.id = :episodeId ', { episodeId })
            .getMany();

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function store(req: Request, res: Response) {
    const { episodeId, body, userId } = req.body;

    const user = await getRepository(Users).findOne(userId);

    if (!user) {
        return res.status(400).json({ error: `User ${userId} does not exist` });
    }

    const episode = await getRepository(Episode).findOne(episodeId);

    if (!episode) {
        return res
            .status(400)
            .json({ error: `Episode ${episodeId} does not exist` });
    }

    try {
        const commentEntity = new Comment();
        commentEntity.episode = episode;
        commentEntity.user = user;
        commentEntity.body = body;
        const comment = await getRepository(Comment).save(commentEntity);

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export default { store, show, Delete };
