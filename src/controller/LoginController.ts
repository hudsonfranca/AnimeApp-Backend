import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../entity/Users';

export default async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await getRepository(Users).findOne({
        email,
    });

    if (!user) {
        return res.status(400).json({ error: 'Cannot find user.' });
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign(
                { sub: user.id },
                process.env.ACCESS_TOKEN_SECRET,
            );
            return res.status(200).json({ accessToken });
        }
        res.status(401).send('Not Allowed');
    } catch (error) {
        res.status(500).json({ error });
    }
}
