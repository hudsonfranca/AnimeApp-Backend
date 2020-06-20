import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import joi from 'joi';
import Season from '../entity/Season';
import Anime from '../entity/Anime';

const seasonSchema = joi.object().keys({
    name: joi.string().required(),
    animeId: joi.number().required(),
});

export async function update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const season = await getRepository(Season).findOne(id);
        if (!season) {
            res.status(404).json({ error: `Season ${id} does not exist` });
        } else {
            season.name = name;
            await getRepository(Season).update(season.id, season);
            res.status(200).json();
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const season = await getRepository(Season).findOne(id);
        if (!season) {
            res.status(404).json({ error: `Season ${id} does not exist` });
        } else {
            await getRepository(Season).delete(season.id);
            res.status(204).json();
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function show(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const seasons = await getRepository(Season).findOne({
            where: { id },
            relations: ['episodes'],
        });

        if (!seasons) {
            res.status(404).json({ error: `Season ${id} does not exist` });
        } else {
            return res.status(200).json(seasons);
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function index(req: Request, res: Response) {
    try {
        const seasons = await getRepository(Season).find();

        if (!seasons) {
            res.status(404).json();
        } else {
            return res.status(200).json(seasons);
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function store(req: Request, res: Response) {
    const { value, error } = joi.validate(req.body, seasonSchema);

    if (error) {
        res.status(422).json({
            error: error.details[0].message,
        });
    }
    const { name, animeId } = req.body;

    const anime = await getRepository(Anime).findOne({ id: animeId });

    if (!anime) {
        res.status(400).json({ error: `Anime ${animeId} does not exist` });
    }

    try {
        const season = new Season();

        season.anime = anime;
        season.name = name;

        const seasonRepository = await getRepository(Season).save(season);
        res.status(200).json(seasonRepository);
    } catch (err) {
        res.status(400).json(err);
    }
}
export default { store, index, show, Delete, update };
