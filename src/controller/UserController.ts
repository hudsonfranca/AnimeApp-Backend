import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import joi from 'joi';
import Users from '../entity/Users';

const userSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});
export async function update(req: Request, res: Response) {
    const { email, password } = req.body;
    const { id } = req.params;

    const { value, error } = joi.validate(req.body, userSchema);

    if (error) {
        res.status(422).json({
            error: error.details[0].message,
        });
    }

    const isValidEmail = await getRepository(Users).findOne({
        email,
    });

    if (isValidEmail) {
        return res.status(400).json({ error: `${email} is alread in use.` });
    }

    const user = await getRepository(Users).findOne(id);

    if (!user) {
        return res.status(400).json({ error: `User ${id} does not exist` });
    }

    try {
        user.email = email;
        user.password = password;

        const userUpdated = await getRepository(Users).update(user.id, user);

        res.status(204).json(userUpdated);
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await getRepository(Users).findOne(id);

    if (!user) {
        return res.status(400).json({ error: `User ${id} does not exist` });
    }
    try {
        await getRepository(Users).delete(user.id);
        res.status(204).json();
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function show(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const user = await getRepository(Users).findOne(id);
        if (!user) {
            res.status(404).json();
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function index(req: Request, res: Response) {
    try {
        const user = await getRepository(Users).find();
        if (!user) {
            res.status(404).json();
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

export async function store(req: Request, res: Response) {
    const { email, password } = req.body;

    const { value, error } = joi.validate(req.body, userSchema);

    if (error) {
        res.status(422).json({
            error: error.details[0].message,
        });
    }

    const isValidEmail = await getRepository(Users).findOne({
        email,
    });

    if (isValidEmail) {
        return res.status(400).json({ error: `${email} is alread in use.` });
    }

    try {
        const user = new Users();
        user.email = email;
        user.password = password;

        const userRepository = await getRepository(Users).save(user);
        res.status(201).json(userRepository);
    } catch (err) {
        res.status(400).json(err);
    }
}

export default {
    store,
    index,
    show,
    Delete,
    update,
};
