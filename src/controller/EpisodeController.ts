import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Episode from '../entity/Episode';
import Anime from '../entity/Anime';
import Season from '../entity/Season';

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const episode = await getRepository(Episode).findOne(id);
        if (!episode) {
            return res
                .status(404)
                .json({ error: `Episode ${id} does not exist` });
        }
        await getRepository(Episode).remove(episode);
        return res.status(204).json();
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function show(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const episodes = await getRepository(Episode).findOne(id, {
            relations: ['thumbnail', 'anime', 'season'],
        });
        if (!episodes) {
            return res
                .status(404)
                .json({ error: `Episode ${id} does not exist` });
        }
        return res.status(200).json(episodes);
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function index(req: Request, res: Response) {
    const { take, skip } = req.query;

    const takeNumber = parseInt(String(take), 10);
    const skipNumber = parseInt(String(skip), 10);
    try {
        const episodes = await getRepository(Episode)
            .createQueryBuilder('episode')
            .leftJoinAndSelect('episode.thumbnail', 'thumbnail')
            .leftJoinAndSelect('episode.anime', 'anime')
            .leftJoinAndSelect('episode.season', 'season')
            .take(takeNumber)
            .skip(skipNumber)
            .orderBy('episode.createdAt', 'DESC')
            .getMany();

        const count = await getRepository(Episode)
            .createQueryBuilder('episode')
            .leftJoinAndSelect('episode.thumbnail', 'thumbnail')
            .leftJoinAndSelect('episode.anime', 'anime')
            .leftJoinAndSelect('episode.season', 'season')
            .take(takeNumber)
            .skip(skipNumber)
            .orderBy('episode.createdAt', 'DESC')
            .getCount();

        if (!episodes) {
            return res.status(404).json();
        }
        if (!count) {
            return res.status(404).json();
        }
        return res.status(200).json({ episodes, count });
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function store(req: Request, res: Response) {
    const { originalname: name, filename: path } = req.file;
    const { animeId, seasonId } = req.body;

    const anime = await getRepository(Anime).findOne({ id: animeId });

    if (!anime) {
        res.status(400).json({ error: `Anime ${animeId} does not exist` });
    }

    const season = await getRepository(Season).findOne({ id: seasonId });

    if (!season) {
        res.status(400).json({ error: `Season ${seasonId} does not exist` });
    }

    try {
        const episode = new Episode();

        episode.name = name;
        episode.path = path;
        episode.anime = anime;
        episode.season = season;

        const episodeRepository = await getRepository(Episode).save(episode);

        return res.status(200).json(episodeRepository);
    } catch (err) {
        res.status(400).send(err);
    }
}

export default { store, index, show, Delete };
