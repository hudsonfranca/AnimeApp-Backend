import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Thumbnail from '../entity/Thumbnail';
import Episode from '../entity/Episode';

export async function show(req: Request, res: Response) {
    const { episodeId } = req.body;

    try {
        const episode = await getRepository(Episode).findOne({ id: episodeId });

        if (!episode) {
            res.status(400).json({
                error: `Episode ${episodeId} does not exist`,
            });
        }

        const thumb = await getRepository(Thumbnail)
            .createQueryBuilder('thumbnail')
            .where('thumbnail.episode.id = :episodeId', {
                episodeId,
            })
            .getOne();

        if (!thumb) {
            res.status(404).json();
        } else {
            return res.status(200).json(thumb);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const thumb = await getRepository(Thumbnail).findOne(id);
        if (!thumb) {
            return res
                .status(404)
                .json({ error: `Thumbnail ${id} does not exist` });
        }
        await getRepository(Thumbnail).remove(thumb);
        return res.status(204).json();
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function store(req: Request, res: Response) {
    const { episodeId } = req.body;

    const episode = await getRepository(Episode).findOne({ id: episodeId });

    if (!episode) {
        res.status(400).json({ error: `Episode ${episodeId} does not exist` });
    }

    const outPath = `${path.resolve(
        __dirname,
        '..',
        '..',
        '.',
        'temp',
        '.',
        'uploads',
        '.',
        'thumbnails',
    )}`;

    const videoPath = `${path.resolve(
        __dirname,
        '..',
        '..',
        '.',
        'temp',
        '.',
        'uploads',
        `${episode.path}`,
    )}`;

    try {
        let thumbName: string;
        ffmpeg(videoPath)
            .on('filenames', function (filenames) {
                thumbName = filenames.join('');
            })
            .on('end', async function () {
                const thumb = new Thumbnail();

                thumb.episode = episode;
                thumb.name = thumbName;

                const ThumbnailRepository = await getRepository(Thumbnail).save(
                    thumb,
                );

                return res.status(200).json(ThumbnailRepository);
                // return res.status(200).json('OK');
            })
            .on('error', function (err) {
                console.error(err);
            })
            .screenshot({
                count: 1,
                folder: outPath,
                size: '320x240',
                filename: 'thumbnail-%b.png',
            });
    } catch (error) {
        console.error(error);
        return res.status(400).json('Could not create thumbnail.');
    }
}

export default { store, Delete, show };
