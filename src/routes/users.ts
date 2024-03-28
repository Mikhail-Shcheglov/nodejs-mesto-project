import { Router } from 'express';

import { validateAvatarUpdation, validationProfileUpdation } from '../utils/validations';
import {
  getProfile,
  getUserById,
  getUsers,
  updateProfile,
  updateProfileAvatar,
} from '../controllers/user';

const router = Router();

router.get('/', getUsers);

router.get('/me', getProfile);

router.patch('/me', validationProfileUpdation(), updateProfile);

router.patch('/me/avatar', validateAvatarUpdation(), updateProfileAvatar);

router.get('/:userId', getUserById);

export default router;
