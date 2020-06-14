import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes';
import connectionDB from './database/database';

const app = express();

app.use(bodyParser.json());
app.use(Routes);

const listen = async () => {
    await connectionDB();

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
};

export default {
    getApp: () => app,
    listen,
};
