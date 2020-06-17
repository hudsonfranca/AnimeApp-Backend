import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import joi from 'joi';
import Anime from '../entity/Anime';
import Genre from '../entity/Genre';

const AnimeSchema = joi.object().keys({
    name: joi.string().required(),
    description: joi.string().max(2000).required(),
    genreId: joi.number().required(),
    debutDate: joi.date().required(),
});

export async function update(req: Request, res: Response) {
    const { value, error } = joi.validate(req.body, AnimeSchema);

    if (error) {
        res.status(422).json({
            error: error.details[0].message,
        });
    }

    const { name, description, genreId, debutDate } = req.body;

    const { id } = req.params;

    const anime = await getRepository(Anime).findOne(id);
    if (!anime) {
        return res.status(400).json({ error: `Anime ${id} does not exist` });
    }

    const genre = await getRepository(Genre).findOne({ id: genreId });

    if (!genre) {
        res.status(400).json({ error: `Gender ${genreId} does not exist` });
    }

    try {
        anime.name = name;
        anime.description = description;
        anime.genre = genre;
        anime.debutDate = debutDate;

        const animeUpdated = await getRepository(Anime).update(anime.id, anime);

        res.status(204).json(animeUpdated);
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    const anime = await getRepository(Anime).findOne(id);

    if (!anime) {
        return res.status(400).json({ error: `Anime ${id} does not exist` });
    }
    try {
        try {
            await getRepository(Anime).delete(anime.id);
            res.status(204).json();
        } catch (err) {
            res.status(400).json(err);
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function show(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const anime = await getRepository(Anime).findOne({
            where: { id },
            relations: ['season', 'season.episodes'],
        });
        if (!anime) {
            res.status(404).json({ error: `Anime ${id} does not exist` });
        } else {
            res.status(200).json(anime);
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function index(req: Request, res: Response) {
    try {
        const anime = await getRepository(Anime).find();
        if (!anime) {
            res.status(404).json();
        } else {
            res.status(200).json(anime);
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function store(req: Request, res: Response) {
    const { value, error } = joi.validate(req.body, AnimeSchema);

    if (error) {
        res.status(422).json({
            error: error.details[0].message,
        });
    }

    const { name, description, genreId, debutDate } = req.body;

    const genre = await getRepository(Genre).findOne({ id: genreId });

    if (!genre) {
        res.status(400).json({ error: `Gender ${genreId} does not exist` });
    }

    try {
        const anime = new Anime();
        anime.name = name;
        anime.description = description;
        anime.genre = genre;
        anime.debutDate = debutDate;
        const animeRepository = await getRepository(Anime).save(anime);
        res.status(200).json(animeRepository);
    } catch (err) {
        res.status(400).json(err);
    }
}
export default { store, index, show, Delete, update };
