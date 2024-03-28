import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { errors } from 'celebrate';

import config from '../config';
import routes from './routes';
import authRoutes from './routes/auth';
import auth from './middlewares/auth';
import handleError from './middlewares/error';
import logger from './middlewares/logger';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger.request);

// роуты, без авторизации
app.use('/', authRoutes);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/', routes);

app.use(logger.error);

app.use(errors());

app.use(handleError);

mongoose.connect(config.db.url);

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`listening on port: ${config.port}`));
