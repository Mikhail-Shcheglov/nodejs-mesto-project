import NotFountError from '../errors/not-found';
import ICard from '../interfaces/card';
import { Controller } from '../interfaces/controller';
import IUser from '../interfaces/user';
import { HTTP_STATUS } from './constants';
import ERROR_MESSAGES from './error-messages';
import mapCard from './map-card';
import mapUser from './map-user';

const { USER, CARD } = ERROR_MESSAGES;

const { NOT_FOUND } = HTTP_STATUS;

export const handleUserResponse = (
  userFunc: Controller<IUser | null>,
): Controller<void> => async (req, res, next) => {
  try {
    const user = await userFunc(req, res, next);

    if (!user) {
      throw new NotFountError(USER[NOT_FOUND]);
    }

    res.send({ data: mapUser(user) });
  } catch (err) {
    next(err);
  }
};

export const handleCardResponse = (
  cardFunc: Controller<ICard | null>,
  status = HTTP_STATUS.OK,
): Controller<void> => async (req, res, next) => {
  try {
    const card = await cardFunc(req, res, next);

    if (!card) {
      throw new NotFountError(CARD[NOT_FOUND]);
    }

    res.status(status).send({ data: mapCard(card) });
  } catch (err) {
    next(err);
  }
};
