import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import joi from 'joi';
import Genre from '../entity/Genre';

const genreSchema = joi.object().keys({
    name: joi.string().required(),
});

export async function update(req: Request, res: Response) {
    const { value, error } = joi.validate(req.body, genreSchema);

    if (error) {
        res.status(422).json({
            error: error.details[0].message,
        });
    }
    const { id } = req.params;
    const { name } = req.body;

    try {
        const genre = await getRepository(Genre).findOne(id);
        if (!genre) {
            res.status(404).json({ error: `Genre ${id} does not exist` });
        } else {
            genre.name = name;
            await getRepository(Genre).update(genre.id, genre);
            return res.status(200).json(genre);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const genre = await getRepository(Genre).findOne(id);
        if (!genre) {
            res.status(404).json({ error: `Genre ${id} does not exist` });
        } else {
            await getRepository(Genre).remove(genre);
            return res.status(204).json();
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function show(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const genre = await getRepository(Genre).findOne(id);
        if (!genre) {
            res.status(404).json({ error: `Genre ${id} does not exist` });
        } else {
            return res.status(200).json(genre);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function index(req: Request, res: Response) {
    try {
        const genres = await getRepository(Genre).find();
        if (!genres) {
            res.status(404).json();
        } else {
            return res.status(200).json(genres);
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function store(req: Request, res: Response) {
    const { value, error } = joi.validate(req.body, genreSchema);

    if (error) {
        res.status(422).json({
            error: error.details[0].message,
        });
    }
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

export default { store, index, show, Delete, update };
