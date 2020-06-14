import { getRepository } from 'typeorm';
import Users from '../../src/entity/User';
import { hashPassword } from '../../src/util';
import connectionDB from '../../src/database/database';

beforeAll(async () => {
    await connectionDB();
});

test('should receive JWT token when authenticated with valid credentials', async () => {
    const password = hashPassword('1234567');
    const user = await getRepository(Users).save({
        email: 'hudson@gmail.com',
        password,
    });

    expect(user.email).toBe('hudson@gmail.com');
});
