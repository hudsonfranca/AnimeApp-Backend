import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Episode from '../entity/Episode';
import Anime from '../entity/Anime';
import Season from '../entity/Season';

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

export default { store };
