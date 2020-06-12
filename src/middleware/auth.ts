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
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Not allowed' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, sub) => {
        if (err) return res.sendStatus(403);
        req.sub = sub;
    });

    next();
}
