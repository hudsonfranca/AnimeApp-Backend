import { getRepository } from 'typeorm';
import request from 'supertest';
import Users from '../../src/entity/Users';
import { hashPassword } from '../../src/util';
import connectionDB, { closeDatabaseConn } from '../../src/database/database';
import app from '../../src/app';

describe('Authentication', () => {
    beforeEach(async () => {
        await connectionDB();
    });

    afterEach(async () => {
        await closeDatabaseConn();
    });
    it('The user must be authenticated if the password is correct.', async () => {
        const password = hashPassword('1234567');
        const user = await getRepository(Users).save({
            email: 'hudson1@gmail.com',
            password,
        });

        const res = await request(app.getApp()).post('/users/login').send({
            email: user.email,
            password: '1234567',
        });

        expect(res.status).toBe(200);
    });

    it('The user should not be authenticated if the password is incorrect.', async () => {
        const password = hashPassword('1234567');
        const user = await getRepository(Users).save({
            email: 'hudson1@gmail.com',
            password,
        });

        const res = await request(app.getApp()).post('/users/login').send({
            email: user.email,
            password: '123456700',
        });

        expect(res.status).toBe(401);
    });
    it('The user must not be authenticated with an invalid email', async () => {
        const res = await request(app.getApp()).post('/users/login').send({
            email: 'hudson3@gmail.com',
            password: '12345670',
        });

        expect(res.status).toBe(400);
    });

    it('should return a jwt token when the user is authenticated.', async () => {
        const password = hashPassword('1234567');
        const user = await getRepository(Users).save({
            email: 'hudson1@gmail.com',
            password,
        });

        const res = await request(app.getApp()).post('/users/login').send({
            email: user.email,
            password: '1234567',
        });

        expect(res.body).toHaveProperty('accessToken');
    });
});
