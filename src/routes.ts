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
import HistoryController from './controller/HistoryController';
import MyListController from './controller/MyListController';
import ImagesController from './controller/ImagesController';
import CommentController from './controller/CommentController';
import ReplieController from './controller/ReplieController';
import ThumbnailController from './controller/ThumbnailController';

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
routes.get('/episode', EpisodeController.index);
routes.get('/episode/:id', EpisodeController.show);
routes.delete('/episode/:id', EpisodeController.Delete);

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
routes.get('/genre', GenreController.index);
routes.get('/genre/:id', GenreController.show);
routes.delete('/genre/:id', GenreController.Delete);
routes.put('/genre/:id', GenreController.update);

// HISTORY ROUTES//
routes.post('/history', HistoryController.store);
routes.get('/history/:userId', HistoryController.show);

// MY LIST ROUTES//
routes.post('/mylist', MyListController.store);
routes.get('/mylist/:userId', MyListController.show);

// IMAGE ROUTES//
routes.post('/image', upload.single('image'), ImagesController.store);
routes.delete('/image/:id', ImagesController.Delete);

// COMMENT ROUTES//
routes.post('/comment', CommentController.store);
routes.get('/comment/:episodeId', CommentController.show);
routes.delete('/comment/:id', CommentController.Delete);

// REPLIE ROUTES//
routes.post('/replie', ReplieController.store);
routes.get('/replie/:commentId', ReplieController.show);
routes.delete('/replie/:id', ReplieController.Delete);

// PREVIEW ROUTES//
routes.post('/thumbnail', ThumbnailController.store);
routes.delete('/thumbnail/:id', ThumbnailController.Delete);
routes.get('/thumbnail', ThumbnailController.show);

export default routes;
