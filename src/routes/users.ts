import { Router } from 'express';

import { validateAvatarUpdation, validateRouteParamIds, validationProfileUpdation } from '../utils/validations';
import {
  getProfile,
  getUserById,
  getUsers,
  updateProfile,
  updateProfileAvatar,
} from '../controllers/user';

const router = Router();

router.get('/users', getUsers);

router.get('/users/me', getProfile);

router.patch('/users/me', validationProfileUpdation(), updateProfile);

router.patch('/users/me/avatar', validateAvatarUpdation(), updateProfileAvatar);

router.get('/users/:userId', validateRouteParamIds('userId'), getUserById);

export default router;
