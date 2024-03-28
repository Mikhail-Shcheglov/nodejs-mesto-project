import { Router } from 'express';

import { validateCreateCardData, validateRouteParamIds } from '../utils/validations';
import {
  createCard, deleteCard, dislikeCard, getCards, likeCard,
} from '../controllers/card';

const router = Router();

router.get('/cards', getCards);

router.post('/cards', validateCreateCardData(), createCard);

router.delete('/cards/:cardId', validateRouteParamIds('cardId'), deleteCard);

router.put('/cards/:cardId/likes', validateRouteParamIds('cardId'), likeCard);

router.delete('/cards/:cardId/likes', validateRouteParamIds('cardId'), dislikeCard);

export default router;
