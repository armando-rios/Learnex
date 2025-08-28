import { Router } from 'express';
import { login } from '../controllers/login';
import { register } from '../controllers/register';
import { verify } from '../controllers/verify';
import { logout } from '../controllers/logout';

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
 *                 example: "user@example.com | username"
 *               password:
 *                 type: string
 *                 example: "yourpassword123"
 *     responses:
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
 *                       example: "1234567890abcdef"
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
 *                       example: "https://example.com/profile.jpg"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

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
 *               - fullName
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or email already exists
 */
router.post('/register', register);

router.get('/verify', verify);

router.post('/logout', logout);

export default router;
