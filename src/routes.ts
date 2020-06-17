import { Router, Request, Response } from 'express';
import multer from 'multer';
import UserController from './controller/UserController';
import login from './controller/LoginController';
import auth from './middleware/auth';
import multerConfig from './config/multer';
import EpisodeController from './controller/EpisodeController';
import AnimeController from './controller/AnimeController';
import SeasonController from './controller/SeasonController';
import GenreController from './controller/GenreController';

const upload = multer(multerConfig);

interface customRequest extends Request {
    sub: any;
}

const routes = Router();

// USER ROUTES//
routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.delete('/user/:id', UserController.Delete);
routes.put('/user/:id', UserController.update);

routes.get('/', auth, (req: customRequest, res: Response) => {
    const { sub } = req;
    return res.json(sub);
});

// LOGIN ROUTES//
routes.post('/users/login', login);

// EPISODE ROUTES//
routes.post('/episode', upload.single('episode'), EpisodeController.store);

// ANIME ROUTES//
routes.post('/anime', AnimeController.store);
routes.get('/anime', AnimeController.index);
routes.get('/anime/:id', AnimeController.show);
routes.delete('/anime/:id', AnimeController.Delete);
routes.put('/anime/:id', AnimeController.update);

// SEASON ROUTES//
routes.post('/season', SeasonController.store);
routes.get('/season', SeasonController.index);
routes.get('/season/:id', SeasonController.show);
routes.delete('/season/:id', SeasonController.Delete);
routes.put('/season/:id', SeasonController.update);

// GENRE ROUTES//
routes.post('/genre', GenreController.store);

export default routes;
