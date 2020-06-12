import { Router, Request, Response } from 'express';
import { saveUser } from './controller/UserController';
import login from './controller/LoginController';
import auth from './middleware/auth';

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

export default routes;
