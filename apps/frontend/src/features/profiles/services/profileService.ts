import api from '../../../shared/lib/axios';

export interface SocialLinks {
  linkedin?: string;
  github?: string;
}

export interface UserProfile {
  bio: string;
  location: string;
  ocupation: string;
  experience: string;
  skills: string[];
  interests: string[];
  socialLinks: SocialLinks;
  contactEmail: string;
  contactPhone: string;
  countryId: string;
  certifications: string[];
  name: string;
  password: string;
  imageUrl: string;
  achievements?: string[];

  // Campos adicionales para compatibilidad con componentes
  id?: string;
  email?: string;
  avatar?: string | null;
  role?: string;
  rating?: number;
  reviewsCount?: number;
}

// ===== API CALLS =====

// Obtener MI PROPIO perfil (usuario autenticado)
export async function getMyProfile(): Promise<UserProfile> {
  try {
    const response = await api.get('/profile/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching my profile:', error);
    throw error;
  }
}

// Obtener perfil de OTRO usuario por ID
export async function getProfile(id: string): Promise<UserProfile> {
  try {
    const response = await api.get(`/profile/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

// Actualizar MI perfil
export async function updateMyProfile(
  data: Partial<UserProfile>
): Promise<UserProfile> {
  try {
    const response = await api.put('/profile/me', data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating my profile:', error);
    throw error;
  }
}

// Crear MI perfil (primera vez)
export async function createMyProfile(
  data: Partial<UserProfile>
): Promise<UserProfile> {
  try {
    const response = await api.post('/profile', data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating my profile:', error);
    throw error;
  }
}
