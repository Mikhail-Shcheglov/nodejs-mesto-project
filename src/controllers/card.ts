import { NextFunction, Request, Response } from 'express';

import { RequestAuthorized } from '../interfaces/controller';
import Card from '../models/card';
import NotFountError from '../errors/not-found';
import { HTTP_STATUS } from '../utils/constants';
import ERROR_MESSAGES from '../utils/error-messages';
import mapCard from '../utils/map-card';

export const createCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.create({
  name: req.body.name,
  link: req.body.link,
})
  .then((card) => {
    if (!card) {
      throw new NotFountError(ERROR_MESSAGES.CARD[404]);
    }

    res.status(HTTP_STATUS.CREATED).send({ data: mapCard(card) });
  })
  .catch(next);

export const deleteCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndDelete(req.params.cardId)
  .then((card): void => {
    if (!card) {
      throw new NotFountError(ERROR_MESSAGES.CARD[404]);
    }

    res.send({ data: mapCard(card) });
  })
  .catch(next);

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards = []) => {
    res.send({ data: cards.map(mapCard) });
  })
  .catch(next);

export const likeCard = (request: Request, res: Response, next: NextFunction) => {
  const req = request as RequestAuthorized;

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card): void => {
      if (!card) {
        throw new NotFountError(ERROR_MESSAGES.CARD[404]);
      }

      res.send({ data: mapCard(card) });
    })
    .catch(next);
};

export const dislikeCard = (
  request: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = request as RequestAuthorized;

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFountError(ERROR_MESSAGES.CARD[404]);
      }

      res.send({ data: mapCard(card) });
    })
    .catch(next);
};
