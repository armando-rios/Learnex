import { Router } from 'express';
import { hola } from '../controllers/hola';
import { hello } from '../controllers/hello';

const router = Router();

router.get('/hola', hola);
router.get('/hello', hello);

export default router;
