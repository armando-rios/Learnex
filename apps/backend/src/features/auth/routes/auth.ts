import { Router } from 'express';
import { login } from '../controllers/login';
import { register } from '../controllers/register';
import { verify } from '../controllers/verify';
import { logout } from '../controllers/logout';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verify', verify);
router.post('/logout', logout);

export default router;
