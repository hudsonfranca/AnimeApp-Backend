import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import joi from 'joi';
import Users from '../entity/User';
import { hashPassword } from '../util';

const userSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

export async function saveUser(req: Request, res: Response) {
    const { body } = req;

    const { value, error } = joi.validate(body, userSchema);

    if (error) {
        res.status(422).json({
            error: error.details[0].message,
        });
    }

    const isValidEmail = await getRepository(Users).findOne({
        email: body.email,
    });

    if (isValidEmail) {
        return res
            .status(400)
            .json({ error: `${body.email} is alread in use.` });
    }

    const password = hashPassword(body.password);
    const user = await getRepository(Users).save({
        email: body.email,
        password,
    });
    res.status(200).json(user);
}

export default {
    saveUser,
};
