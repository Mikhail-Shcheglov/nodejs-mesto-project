import { Router } from 'express';

import {
  createUser, getUserById, getUsers, updateProfile, updateProfileAvatar,
} from '../controllers/user';

const router = Router();

router.post('/', createUser);

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateProfileAvatar);

export default router;
