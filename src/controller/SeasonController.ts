import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Season from '../entity/Season';
import Anime from '../entity/Anime';

export async function saveSeason(req: Request, res: Response) {
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
export default { saveSeason };
