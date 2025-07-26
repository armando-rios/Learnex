import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMyProfile,
  getProfile,
  updateMyProfile,
  createMyProfile,
  type UserProfile,
} from '../services/profileService';

// Hook para obtener MI PROPIO perfil (usuario autenticado)
export const useMyProfile = () => {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: async () => {
      console.log('useMyProfile - obteniendo mi perfil');
      return await getMyProfile();
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false, // No reintentar automáticamente en caso de error 500
  });
};

// Hook para obtener perfil de OTRO usuario por ID
export const useProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      console.log('useProfile - obteniendo perfil de usuario:', userId);

      if (!userId) {
        throw new Error('No user ID provided');
      }

      return await getProfile(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false,
  });
};

// Hook para actualizar MI PROPIO perfil
export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      try {
        // Intentar actualizar mi perfil existente
        return await updateMyProfile(data);
      } catch (error: unknown) {
        // Si mi perfil no existe (404), crear uno nuevo
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { status?: number } };
          if (axiosError?.response?.status === 404) {
            return await createMyProfile(data);
          }
        }
        throw error;
      }
    },
    onSuccess: (updatedProfile) => {
      // Actualizar cache de mi perfil
      queryClient.setQueryData(['profile', 'me'], updatedProfile);

      // Invalidar todas las queries de perfil para refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: unknown) => {
      console.error('Error updating/creating my profile:', error);
    },
  });
};

// Mantener el hook anterior para compatibilidad (DEPRECATED)
export const useUpdateProfile = useUpdateMyProfile;
