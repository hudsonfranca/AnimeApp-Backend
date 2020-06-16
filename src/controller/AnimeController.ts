import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Anime from '../entity/Anime';
import Genre from '../entity/Genre';

export async function store(req: Request, res: Response) {
    const { name, episode, description, genreId, date } = req.body;

    const genre = await getRepository(Genre).findOne({ id: genreId });

    if (!genre) {
        res.status(400).json({ error: `Gender ${genreId} does not exist` });
    }

    try {
        const anime = new Anime();
        anime.name = name;
        anime.episode = episode;
        anime.description = description;
        anime.genre = genre;
        anime.date = date;
        const animeRepository = await getRepository(Anime).save(anime);
        res.status(200).json(animeRepository);
    } catch (err) {
        res.status(400).json(err);
    }
}
export default { store };
