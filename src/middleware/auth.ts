import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface customRequest extends Request {
    sub: any;
}

export default async function auth(
    req: customRequest,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token error' });
    }

    const [bearer, token] = parts;

    if (!/^Bearer$/i.test(bearer)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, sub) => {
            if (err) return res.status(403).json({ msg: 'invalid token' });
            req.sub = sub;
        });

        return next();
    } catch (err) {
        return res.status(401).json({ msg: 'invalid token' });
    }
}
