import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import joi from 'joi';
import Users from '../entity/Users';
import Episode from '../entity/Episode';
import History from '../entity/History';
import EpisodeToHistory from '../entity/EpisodeToHistory';

export async function show(req: Request, res: Response) {
    const { userId: id } = req.params;

    try {
        const userHistory = await getRepository(Users).findOne({
            where: { id },
            relations: ['history', 'history.episodeToHistory'],
        });
        if (!userHistory) {
            res.status(404).json();
        } else {
            return res.status(200).json(userHistory);
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function store(req: Request, res: Response) {
    const { userId, episodeId } = req.body;

    const user = await getRepository(Users).findOne(userId);

    if (!user) {
        return res.status(400).json({ error: `User ${userId} does not exist` });
    }

    const episode = await getRepository(Episode).findOne(episodeId);

    if (!episode) {
        return res
            .status(400)
            .json({ error: `Episode ${episodeId} does not exist` });
    }

    let history = await getRepository(History).findOne(userId);

    if (!history) {
        const historyEtity = new History();
        historyEtity.user = user;
        history = await getRepository(History).save(historyEtity);
    }

    try {
        const episodeToHistoryEntity = new EpisodeToHistory();
        episodeToHistoryEntity.episode = episode;
        episodeToHistoryEntity.history = history;
        episodeToHistoryEntity.date = new Date();

        const episodeToHistory = await getRepository(EpisodeToHistory).save(
            episodeToHistoryEntity,
        );

        return res.status(200).json(episodeToHistory);
    } catch (error) {
        res.status(400).json(error);
    }
}

export default {
    store,
    show,
};
