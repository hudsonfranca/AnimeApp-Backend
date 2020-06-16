// import { getRepository } from 'typeorm';
// import request from 'supertest';
// import Users from '../../src/entity/Users';
// import connectionDB, { closeDatabaseConn } from '../../src/database/database';
// import app from '../../src/app';

// beforeEach(async () => {
//     await connectionDB();
// });

// describe('User endpoints', () => {
//     it('should return an error if the email or password is invalid.', async () => {
//         const res = await request(app.getApp()).post('/user').send({
//             email: 'hudsongmail.com',
//             password: '1234',
//         });

//         expect(res.status).toBe(422);
//     });
// });
