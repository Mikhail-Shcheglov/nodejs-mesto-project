import express from 'express';
import mongoose from 'mongoose';

import auth from './middlewares/auth';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { DEFAULT_MONGO_DB_URL, DEFAULT_PORT } from './utils/constants';
import handleError from './middlewares/error';

const {
  PORT = DEFAULT_PORT,
  DB_URL = DEFAULT_MONGO_DB_URL,
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

mongoose.connect(DB_URL);

app.use(handleError);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
