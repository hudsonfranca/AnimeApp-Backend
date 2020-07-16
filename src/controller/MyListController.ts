import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Users from '../entity/Users';
import Anime from '../entity/Anime';
import MyList from '../entity/MyList';
import AnimesToMyList from '../entity/AnimesToMyList';

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
        const mylist = await getRepository(MyList)
            .createQueryBuilder('my_list')
            .leftJoinAndSelect('my_list.animesToMyList', 'animesToMyList')
            .leftJoinAndSelect('animesToMyList.anime', 'anime')
            .leftJoinAndSelect('anime.images', 'images')
            .where('my_list.user.id = :userId', { userId: sub })
            .getOne();
        if (!mylist) {
            res.status(404).json();
        } else {
            return res.status(200).json(mylist);
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function store(req: customRequest, res: Response) {
    const { animeId } = req.body;
    const { sub: userId } = req.sub;
    const user = await getRepository(Users).findOne(userId);

    if (!user) {
        return res.status(400).json({ error: `User ${userId} does not exist` });
    }

    const anime = await getRepository(Anime).findOne(animeId);

    if (!anime) {
        return res
            .status(400)
            .json({ error: `Episode ${animeId} does not exist` });
    }

    let myList = await getRepository(MyList).findOne(userId);

    if (!myList) {
        const myListEtity = new MyList();
        myListEtity.user = user;

        try {
            myList = await getRepository(MyList).save(myListEtity);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    const animeExistsOnMyList = await getRepository(AnimesToMyList).findOne({
        animeId,
    });

    if (animeExistsOnMyList) {
        return res.status(200).json(animeExistsOnMyList);
    }

    try {
        const animesToMyListEntity = new AnimesToMyList();
        animesToMyListEntity.anime = anime;
        animesToMyListEntity.myList = myList;

        const animesToMyList = await getRepository(AnimesToMyList).save(
            animesToMyListEntity,
        );

        return res.status(200).json(animesToMyList);
    } catch (error) {
        res.status(400).json(error);
    }
}

export default {
    store,
    show,
};
