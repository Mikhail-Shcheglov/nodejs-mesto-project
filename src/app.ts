import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { errors } from 'celebrate';

import { validateCreateUserData, validateLoginData } from './utils/validations';
import { createUser, login } from './controllers/user';
import auth from './middlewares/auth';
import handleError from './middlewares/error';
import logger from './middlewares/logger';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { DEFAULT_MONGO_DB_URL, DEFAULT_PORT } from './utils/constants';

const {
  PORT = DEFAULT_PORT,
  DB_URL = DEFAULT_MONGO_DB_URL,
} = process.env;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger.request);

// роуты, без авторизации
app.post('/signin', validateLoginData(), login);
app.post('/signup', validateCreateUserData(), createUser);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

mongoose.connect(DB_URL);

app.use(logger.error);

app.use(errors());

app.use(handleError);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
