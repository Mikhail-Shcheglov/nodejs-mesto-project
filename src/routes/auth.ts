import { Router } from 'express';

import { createUser, login } from '../controllers/user';
import { validateCreateUserData, validateLoginData } from '../utils/validations';

const router = Router();

router.post('/signin', validateLoginData(), login);
router.post('/signup', validateCreateUserData(), createUser);

export default router;
