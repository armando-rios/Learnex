import { Router } from 'express';
import { 
  getMyProfile, 
  updateMyProfile, 
  getProfileById, 
  changePassword, 
  updateAvatar 
} from '../controllers/profile';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PublicProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f1b2a3c4d5e6f7a8b9c0d1"
 *         fullName:
 *           type: string
 *           example: "John Doe"
 *         username:
 *           type: string
 *           example: "johndoe"
 *         imageUrl:
 *           type: string
 *           example: "https://ui-avatars.com/api/?name=John%20Doe&background=random&size=128"
 *         bio:
 *           type: string
 *           example: "Software developer passionate about technology"
 *         location:
 *           type: string
 *           example: "New York, USA"
 *         ocupation:
 *           type: string
 *           example: "Software Engineer"
 *         experience:
 *           type: string
 *           example: "5+ years"
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["JavaScript", "React", "Node.js"]
 *         interests:
 *           type: array
 *           items:
 *             type: string
 *           example: ["AI", "Machine Learning", "Open Source"]
 *         socialLinks:
 *           type: object
 *           properties:
 *             linkedin:
 *               type: string
 *               example: "https://linkedin.com/in/johndoe"
 *             github:
 *               type: string
 *               example: "https://github.com/johndoe"
 *         certifications:
 *           type: array
 *           items:
 *             type: string
 *           example: ["AWS Certified", "Google Cloud Professional"]
 *         achievements:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Published 10+ articles", "Speaker at conferences"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     PrivateProfile:
 *       allOf:
 *         - $ref: '#/components/schemas/PublicProfile'
 *         - type: object
 *           properties:
 *             contactEmail:
 *               type: string
 *               example: "john.personal@example.com"
 *             contactPhone:
 *               type: string
 *               example: "+1234567890"
 *             countryId:
 *               type: string
 *               example: "US"
 *     
 *     UpdateProfileRequest:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           example: "John Updated Doe"
 *         username:
 *           type: string
 *           example: "johnupdated"
 *         bio:
 *           type: string
 *           example: "Updated bio description"
 *         location:
 *           type: string
 *           example: "San Francisco, USA"
 *         ocupation:
 *           type: string
 *           example: "Senior Software Engineer"
 *         experience:
 *           type: string
 *           example: "7+ years"
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["TypeScript", "React", "Node.js", "Python"]
 *         interests:
 *           type: array
 *           items:
 *             type: string
 *           example: ["AI", "Blockchain", "Web3"]
 *         socialLinks:
 *           type: object
 *           properties:
 *             linkedin:
 *               type: string
 *             github:
 *               type: string
 *         contactEmail:
 *           type: string
 *           example: "updated.email@example.com"
 *         contactPhone:
 *           type: string
 *           example: "+1987654321"
 *         countryId:
 *           type: string
 *           example: "US"
 *         certifications:
 *           type: array
 *           items:
 *             type: string
 *           example: ["AWS Solutions Architect", "Kubernetes Certified"]
 *     
 *     ChangePasswordRequest:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           example: "currentPassword123"
 *         newPassword:
 *           type: string
 *           example: "newSecurePassword456"
 *     
 *     UpdateAvatarRequest:
 *       type: object
 *       properties:
 *         imageUrl:
 *           type: string
 *           example: "https://example.com/new-avatar.jpg"
 */

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Get authenticated user's complete profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   $ref: '#/components/schemas/PrivateProfile'
 *                 message:
 *                   type: string
 *                   example: "Perfil obtenido exitosamente"
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.get('/me', getMyProfile);

/**
 * @swagger
 * /profile/me:
 *   put:
 *     summary: Update authenticated user's complete profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   $ref: '#/components/schemas/PrivateProfile'
 *                 message:
 *                   type: string
 *                   example: "Perfil actualizado exitosamente"
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.put('/me', updateMyProfile);

/**
 * @swagger
 * /profile/{userId}:
 *   get:
 *     summary: Get public profile of user by ID
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to get profile for
 *         example: "64f1b2a3c4d5e6f7a8b9c0d1"
 *     responses:
 *       200:
 *         description: Public profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   $ref: '#/components/schemas/PublicProfile'
 *                 message:
 *                   type: string
 *                   example: "Perfil público obtenido exitosamente"
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.get('/:userId', getProfileById);

/**
 * @swagger
 * /profile/password:
 *   put:
 *     summary: Change user password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña actualizada exitosamente"
 *       400:
 *         description: Invalid current password or new password too short
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/password', changePassword);

/**
 * @swagger
 * /profile/avatar:
 *   put:
 *     summary: Update user avatar/profile image
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAvatarRequest'
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   example: "https://ui-avatars.com/api/?name=John%20Doe&background=random&size=128"
 *                 message:
 *                   type: string
 *                   example: "Avatar actualizado exitosamente"
 *       401:
 *         description: User not authenticated
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.put('/avatar', updateAvatar);

export default router;