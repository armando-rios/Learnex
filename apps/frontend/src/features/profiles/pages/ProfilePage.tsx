import { useState, useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import ExperienceSection from '../components/ExperienceSection';
import InterestsSection from '../components/InterestsSection';
import MentoringSpecialtiesSection from '../components/MentoringSpecialtiesSection';
import LearningGoalsSection from '../components/LearningGoalsSection';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import useAuthStore from '../../auth/store/useAuthStore';
import { useMyProfile } from '../hooks/useProfile';
import EditProfileModal from '../components/EditProfileModal';
import { useLocation, useNavigate } from 'react-router-dom';
import type { UserProfile } from '../services/profileService';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { data: profile, isLoading, error } = useMyProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Detectar si se debe abrir el modal automáticamente desde URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('edit') === 'true') {
      setIsEditModalOpen(true);
      // Limpiar el parámetro de la URL sin recargar la página
      navigate('/perfil', { replace: true });
    }
  }, [location, navigate]);

  console.log('ProfilePage - User:', user);
  console.log('ProfilePage - Profile:', profile);
  console.log('ProfilePage - Loading:', isLoading);
  console.log('ProfilePage - Error:', error);

  if (isLoading) return <div>Cargando perfil...</div>;

  // Verificar si hay error 500 o el perfil no existe o está vacío
  const hasError =
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'status' in error.response &&
    error.response.status === 500;
  const isProfileEmpty = hasError || !profile || !profile.bio;

  // Crear perfil mínimo con datos del usuario autenticado cuando no existe perfil completo
  const displayProfile: UserProfile = isProfileEmpty
    ? {
        id: user?.id || '',
        name: profile?.name || user?.name || '',
        email: '',
        role: user?.role || 'ROLE_USER',
        avatar: user?.avatar || null,
        bio: '',
        location: '',
        ocupation: '',
        experience: '',
        skills: [],
        interests: [],
        socialLinks: { linkedin: '', github: '' },
        contactEmail: '',
        contactPhone: '',
        countryId: '',
        certifications: [],
        password: '',
        imageUrl: '',
        achievements: [],
      }
    : {
        ...profile,
      };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header fijo con breadcrumb y título */}
      <div className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 font-Inter">
          <Breadcrumb />
          <h1 className="text-2xl lg:text-3xl font-bold text-green-600 font-Inter mt-1">
            Mi Perfil
          </h1>
        </div>
      </div>

      {/* Mensaje de bienvenida para perfiles vacíos */}
      {isProfileEmpty && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mx-4 lg:mx-6 mt-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                ¡Bienvenido a SkillLink!
              </h3>
              <p className="text-blue-800 text-sm">
                Completa tu perfil para conectar con{' '}
                {user?.role === 'ROLE_MENTOR' ? 'estudiantes' : 'mentores'},
                encontrar oportunidades y mostrar tus habilidades a la
                comunidad.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 font-Inter">
          {/* Layout en columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Columna izquierda */}
            <div className="lg:col-span-1 space-y-4">
              <ProfileHeader
                profile={displayProfile}
                onEditClick={() => setIsEditModalOpen(true)}
              />
              <ContactSection profile={displayProfile} />
              <InterestsSection profile={displayProfile} />
            </div>

            {/* Columna derecha */}
            <div className="lg:col-span-2 space-y-4">
              <AboutSection profile={displayProfile} />
              <SkillsSection profile={displayProfile} />

              {/* Secciones específicas por rol */}
              {user?.role === 'ROLE_MENTOR' ? (
                <>
                  <ExperienceSection profile={displayProfile} />
                  <MentoringSpecialtiesSection profile={displayProfile} />
                </>
              ) : (
                <>
                  <LearningGoalsSection profile={displayProfile} />
                  <ExperienceSection profile={displayProfile} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal global */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={displayProfile}
        section="all"
      />
    </div>
  );
};

export default ProfilePage;
