import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Users from '../entity/Users';
import Replie from '../entity/Replie';
import Comment from '../entity/Comment';

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    const replie = await getRepository(Replie).findOne(id);

    if (!replie) {
        return res.status(400).json({ error: `Replie ${id} does not exist` });
    }

    try {
        await getRepository(Replie).remove(replie);
        return res.status(204).json();
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function show(req: Request, res: Response) {
    const { commentId } = req.params;

    try {
        const comment = await getRepository(Comment).findOne(commentId);

        if (!comment) {
            return res
                .status(400)
                .json({ error: `Comment ${commentId} does not exist` });
        }

        const replie = await getRepository(Replie)
            .createQueryBuilder('replie')
            .where('replie.comment.id = :commentId ', { commentId })
            .getMany();

        return res.status(200).json(replie);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function store(req: Request, res: Response) {
    const { commentId, body, userId } = req.body;

    const user = await getRepository(Users).findOne(userId);

    if (!user) {
        return res.status(400).json({ error: `User ${userId} does not exist` });
    }

    const comment = await getRepository(Comment).findOne(commentId);

    if (!comment) {
        return res
            .status(400)
            .json({ error: `Episode ${commentId} does not exist` });
    }

    try {
        const replieEntity = new Replie();
        replieEntity.comment = comment;
        replieEntity.user = user;
        replieEntity.body = body;
        const replie = await getRepository(Replie).save(replieEntity);

        return res.status(200).json(replie);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export default { store, show, Delete };
