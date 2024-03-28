import { NextFunction, Request, Response } from 'express';

import { RequestAuthorized } from '../interfaces/controller';
import Card from '../models/card';
import ForbiddenError from '../errors/forbidden-error';
import NotFountError from '../errors/not-found';
import { HTTP_STATUS } from '../utils/constants';
import ERROR_MESSAGES from '../utils/error-messages';
import mapCard from '../utils/map-card';

const { CREATED, FORBIDDEN, NOT_FOUND } = HTTP_STATUS;
const { CARD } = ERROR_MESSAGES;

export const createCard = (
  request: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = request as RequestAuthorized;

  return Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user?._id,
  })
    .then((card) => {
      if (!card) {
        throw new NotFountError(CARD[NOT_FOUND]);
      }

      res.status(CREATED).send({ data: mapCard(card) });
    })
    .catch(next);
};

export const deleteCard = (
  request: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = request as RequestAuthorized;

  return Card.findById(req.params.cardId)
    .then((card): void => {
      if (!card) {
        throw new NotFountError(CARD[NOT_FOUND]);
      }

      if (card.owner.toString() !== req.user?._id) {
        throw new ForbiddenError(CARD.DELETE[FORBIDDEN]);
      }

      res.send({ data: mapCard(card) });
    })
    .catch(next);
};

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
        throw new NotFountError(CARD[NOT_FOUND]);
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
        throw new NotFountError(CARD[NOT_FOUND]);
      }

      res.send({ data: mapCard(card) });
    })
    .catch(next);
};
