import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Genre from '../entity/Genre';

export async function saveGenre(req: Request, res: Response) {
    const { name } = req.body;

    try {
        const genre = await getRepository(Genre).save({
            name,
        });
        return res.status(200).json(genre);
    } catch (err) {
        res.status(400).send(err);
    }
}

export default { saveGenre };
