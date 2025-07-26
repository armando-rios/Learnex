import { Router } from 'express';
import { hola } from '../controllers/hola';
import { hello } from '../controllers/hello';

const router = Router();

/**
 * @swagger
 * /greet/hola:
 *   get:
 *     summary: Get Spanish greeting
 *     tags: [Greet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns hola message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/hola', hola);

/**
 * @swagger
 * /greet/hello:
 *   get:
 *     summary: Get English greeting
 *     tags: [Greet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns hello message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/hello', hello);

export default router;
