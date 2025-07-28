import { Router } from 'express';
import { login } from '../controllers/login';
import { register } from '../controllers/register';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
  *             required:
  *               - login
  *               - password
  *             properties:
  *               login:
  *                 type: string
  *                 example: "user@example.com or username"
  *                 description: "Email or username of the user"
  *               password:
  *                 type: string
  *                 example: "yourpassword123" *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
  *                 user:
  *                   type: object
  *                   properties:
  *                     id:
  *                       type: string
  *                       example: "507f1f77bcf86cd799439011"
  *                     fullname:
  *                       type: string
  *                       example: "John Doe"
  *                     username:
  *                       type: string
  *                       example: "johndoe"
  *                     email:
  *                       type: string
  *                       example: "john@example.com"
  *                     image:
  *                       type: string
  *                       example: "https://github.com/armando-rios.png"
  *                 token:
  *                   type: string
  *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." *       401:
 *         description: Invalid credentials
 */
router.post('/profile', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
  *             required:
  *               - email
  *               - username
  *               - password
  *               - fullname
  *             properties:
  *               email:
  *                 type: string
  *                 example: "newuser@example.com"
  *               username:
  *                 type: string
  *                 example: "johndoe"
  *                 description: "Username (letters, numbers, and hyphens only)"
  *               password:
  *                 type: string
  *                 example: "securepassword123"
  *               fullname:
  *                 type: string
  *                 example: "John Doe" *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or email already exists
 */
router.post('/register', register);

export default router;
