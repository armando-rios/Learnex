import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../../shared/models/User';
import Profile from '../../../shared/models/Profile';

// Extend Request interface to include user from auth middleware
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}
import { 
  UpdateProfileRequest, 
  ChangePasswordRequest, 
  UpdateAvatarRequest,
  PublicProfileResponse,
  PrivateProfileResponse 
} from '../types';

// GET /api/profile/me - Obtener perfil completo del usuario autenticado
export const getMyProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const profile = await Profile.findOne({ userId });
    const user = await User.findById(userId);

    if (!profile || !user) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    const privateProfile: PrivateProfileResponse = {
      id: profile._id.toString(),
      fullName: profile.fullName,
      username: profile.username,
      imageUrl: profile.imageUrl,
      bio: profile.bio,
      location: profile.location,
      ocupation: profile.ocupation,
      experience: profile.experience,
      skills: profile.skills,
      interests: profile.interests,
      socialLinks: profile.socialLinks,
      contactEmail: profile.contactEmail,
      contactPhone: profile.contactPhone,
      countryId: profile.countryId,
      certifications: profile.certifications,
      achievements: profile.achievements,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };

    return res.status(200).json({
      profile: privateProfile,
      message: 'Perfil obtenido exitosamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// PUT /api/profile/me - Actualizar perfil completo del usuario autenticado
export const updateMyProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const updateData: UpdateProfileRequest = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Validar email si se está actualizando
    if (updateData.contactEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.contactEmail)) {
        return res.status(400).json({ message: 'Email inválido' });
      }
    }

    // Validar username si se está actualizando
    if (updateData.username) {
      const existingProfile = await Profile.findOne({ 
        username: updateData.username,
        userId: { $ne: userId }
      });
      
      if (existingProfile) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
      }

      // También actualizar en el modelo User
      await User.findByIdAndUpdate(userId, { username: updateData.username });
    }

    // Actualizar fullName en User si se proporciona
    if (updateData.fullName) {
      await User.findByIdAndUpdate(userId, { fullName: updateData.fullName });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    const responseProfile: PrivateProfileResponse = {
      id: updatedProfile._id.toString(),
      fullName: updatedProfile.fullName,
      username: updatedProfile.username,
      imageUrl: updatedProfile.imageUrl,
      bio: updatedProfile.bio,
      location: updatedProfile.location,
      ocupation: updatedProfile.ocupation,
      experience: updatedProfile.experience,
      skills: updatedProfile.skills,
      interests: updatedProfile.interests,
      socialLinks: updatedProfile.socialLinks,
      contactEmail: updatedProfile.contactEmail,
      contactPhone: updatedProfile.contactPhone,
      countryId: updatedProfile.countryId,
      certifications: updatedProfile.certifications,
      achievements: updatedProfile.achievements,
      createdAt: updatedProfile.createdAt,
      updatedAt: updatedProfile.updatedAt,
    };

    return res.status(200).json({
      profile: responseProfile,
      message: 'Perfil actualizado exitosamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// GET /api/profile/:userId - Ver perfil público de otro usuario por ID
export const getProfileById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId: targetUserId } = req.params;
    const currentUserId = req.user?.id;

    if (!currentUserId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Si es el mismo usuario, redirigir a /me (o devolver perfil completo)
    if (targetUserId === currentUserId) {
      return getMyProfile(req, res);
    }

    const profile = await Profile.findOne({ userId: targetUserId });

    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    // Devolver solo campos públicos
    const publicProfile: PublicProfileResponse = {
      id: profile._id.toString(),
      fullName: profile.fullName,
      username: profile.username,
      imageUrl: profile.imageUrl,
      bio: profile.bio,
      location: profile.location,
      ocupation: profile.ocupation,
      experience: profile.experience,
      skills: profile.skills,
      interests: profile.interests,
      socialLinks: profile.socialLinks,
      certifications: profile.certifications,
      achievements: profile.achievements,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };

    return res.status(200).json({
      profile: publicProfile,
      message: 'Perfil público obtenido exitosamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// PUT /api/profile/password - Cambiar contraseña del usuario
export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword }: ChangePasswordRequest = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: 'Se requiere la contraseña actual y la nueva contraseña' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        message: 'La nueva contraseña debe tener al menos 6 caracteres' 
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    // Hash de la nueva contraseña
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Actualizar contraseña
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    return res.status(200).json({
      message: 'Contraseña actualizada exitosamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// PUT /api/profile/avatar - Actualizar solo la imagen de perfil
export const updateAvatar = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { imageUrl }: UpdateAvatarRequest = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    let finalImageUrl = imageUrl;

    // Si no se proporciona URL, generar una con ui-avatars
    if (!imageUrl) {
      const profile = await Profile.findOne({ userId });
      if (profile) {
        finalImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=random&size=128`;
      }
    }

    // Actualizar imageUrl en Profile
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      { imageUrl: finalImageUrl },
      { new: true }
    );

    // También actualizar en User
    await User.findByIdAndUpdate(userId, { imageUrl: finalImageUrl });

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    return res.status(200).json({
      imageUrl: finalImageUrl,
      message: 'Avatar actualizado exitosamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};