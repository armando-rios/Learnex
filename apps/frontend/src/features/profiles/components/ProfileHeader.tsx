import { User } from 'lucide-react';
import useAuthStore from '../../auth/store/useAuthStore';
import type { UserProfile } from '../services/profileService';

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick: () => void;
}

const ProfileHeader = ({ profile, onEditClick }: ProfileHeaderProps) => {
  const { user } = useAuthStore();

  const displayName = user?.name || profile.name || 'Usuario';

  // El rol siempre viene correcto del backend/useAuthStore
  const isStudent = user?.role === 'ROLE_USER';
  const isMentor = user?.role === 'ROLE_MENTOR';
  const roleDisplayText = isMentor ? 'Mentor' : 'Estudiante';

  // Función para obtener la URL del avatar de forma segura
  const getAvatarSrc = (): string | undefined => {
    return user?.avatar || profile.avatar || undefined;
  };

  const avatarSrc = getAvatarSrc();

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 font-Inter">
      {/* Contenido principal */}
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden mb-4">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="Avatar del usuario"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          )}
        </div>

        {/* Nombre del usuario */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-theme-text-dark mb-3 font-Inter tracking-tight break-words">
          {displayName}
        </h1>

        {/* Ocupación y Role */}
        <div className="flex flex-col items-center gap-2 mb-4">
          {/* Ocupación (si existe) */}
          {profile.ocupation && profile.ocupation.trim() && (
            <p className="text-sm sm:text-base text-theme-focus-primary font-normal font-Inter text-center break-words">
              {profile.ocupation}
            </p>
          )}

          {/* Role Badge */}
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium font-Inter ${
              isStudent
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}
          >
            {roleDisplayText}
          </span>
        </div>

        {/* Botón Editar perfil */}
        <button
          onClick={onEditClick}
          className="bg-theme-button-primary hover:bg-theme-button-primary/90 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors font-Inter text-sm sm:text-base w-full sm:w-auto"
        >
          Editar perfil
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
