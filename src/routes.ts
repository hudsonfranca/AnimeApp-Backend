import { Router, Request, Response } from 'express';
import multer from 'multer';
import { saveUser } from './controller/UserController';
import login from './controller/LoginController';
import auth from './middleware/auth';
import multerConfig from './config/multer';
import { saveEpisode } from './controller/EpisodeController';
import { saveAnime } from './controller/AnimeController';
import { saveSeason } from './controller/SeasonController';
import { saveGenre } from './controller/GenreController';

const upload = multer(multerConfig);

interface customRequest extends Request {
    sub: any;
}

const routes = Router();

routes.post('/user', saveUser);

routes.get('/', auth, (req: customRequest, res: Response) => {
    const { sub } = req;
    return res.json(sub);
});

routes.post('/users/login', login);

routes.post('/episode', upload.single('episode'), saveEpisode);

routes.post('/anime', saveAnime);

routes.post('/season', saveSeason);

routes.post('/genre', saveGenre);

export default routes;
