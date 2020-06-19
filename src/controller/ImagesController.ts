import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Image from '../entity/Image';
import Anime from '../entity/Anime';

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const image = await getRepository(Image).findOne(id);
        if (!image) {
            return res
                .status(404)
                .json({ error: `image ${id} does not exist` });
        }
        await getRepository(Image).remove(image);
        return res.status(204).json();
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function store(req: Request, res: Response) {
    const { originalname: name, filename: path } = req.file;
    const { animeId } = req.body;

    const anime = await getRepository(Anime).findOne({ id: animeId });

    if (!anime) {
        res.status(400).json({ error: `Anime ${animeId} does not exist` });
    }

    try {
        const image = new Image();

        image.name = name;
        image.path = path;
        image.anime = anime;

        const imageRepository = await getRepository(Image).save(image);

        return res.status(200).json(imageRepository);
    } catch (err) {
        res.status(400).send(err);
    }
}

export default { store, Delete };
