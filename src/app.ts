import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import Routes from './routes';
import connectionDB from './database/database';

export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'temp', 'uploads')),
);
app.use(Routes);

export const listen = async () => {
    await connectionDB();

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
};

export default {
    app,
    listen,
};
