import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Users from '../entity/Users';
import Episode from '../entity/Episode';
import History from '../entity/History';
import EpisodeToHistory from '../entity/EpisodeToHistory';

interface customRequest extends Request {
    sub: any;
}

export async function show(req: customRequest, res: Response) {
    const { sub } = req.sub;

    const user = await getRepository(Users).findOne(sub);

    if (!user) {
        return res.status(400).json({ error: `User ${sub} does not exist` });
    }

    try {
        const history = await getRepository(History)
            .createQueryBuilder('history')
            .leftJoinAndSelect('history.episodeToHistory', 'episodeToHistory')
            .leftJoinAndSelect('episodeToHistory.episode', 'episode')
            .where('history.user.id = :userId', { userId: sub })
            .getOne();

        if (!history) {
            res.status(404).json();
        } else {
            return res.status(200).json(history);
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function store(req: customRequest, res: Response) {
    const { episodeId } = req.body;
    const { sub } = req.sub;

    const user = await getRepository(Users).findOne(sub);

    if (!user) {
        return res.status(400).json({ error: `User ${sub} does not exist` });
    }

    const episode = await getRepository(Episode).findOne(episodeId);

    if (!episode) {
        return res
            .status(400)
            .json({ error: `Episode ${episodeId} does not exist` });
    }

    let history = await getRepository(History).findOne(sub);

    if (!history) {
        const historyEtity = new History();
        historyEtity.user = user;
        try {
            history = await getRepository(History).save(historyEtity);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    try {
        const episodeToHistoryEntity = new EpisodeToHistory();
        episodeToHistoryEntity.episode = episode;
        episodeToHistoryEntity.history = history;

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
