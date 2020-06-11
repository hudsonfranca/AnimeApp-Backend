import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import Routes from './routes';

const app = express();

createConnection();

app.use(bodyParser.json());
app.use(Routes);

app.listen(3333, () => console.log('Server up on port 3333'));
