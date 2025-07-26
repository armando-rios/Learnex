import { Building2 } from 'lucide-react';
import type { UserProfile } from '../services/profileService';
import useAuthStore from '../../auth/store/useAuthStore';

interface ExperienceSectionProps {
  profile: UserProfile | undefined;
}

const ExperienceSection = ({ profile }: ExperienceSectionProps) => {
  const { user } = useAuthStore();
  const isStudent = user?.role === 'ROLE_USER';

  // Manejar tanto strings como arrays de experiencia
  const experienceArray = Array.isArray(profile?.experience)
    ? profile?.experience
    : profile?.experience && profile.experience.trim()
      ? [
          {
            title: 'Experiencia Profesional',
            company: 'Múltiples empresas',
            period: 'Varios años',
            description: profile.experience,
          },
        ]
      : [];

  const isEmpty = !experienceArray || experienceArray.length === 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-4 font-Inter">
      <h2 className="text-xl font-bold text-gray-900 font-Inter mb-4">
        Experiencia
      </h2>

      {isEmpty ? (
        <div className="text-center py-8 text-gray-400">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          {isStudent ? (
            <>
              <p className="text-sm">
                Comparte tu experiencia académica, proyectos escolares o
                prácticas profesionales.
              </p>
              <p className="text-xs mt-2">
                Proyectos universitarios, prácticas, trabajos de medio tiempo...
              </p>
            </>
          ) : (
            <>
              <p className="text-sm">
                Comparte tu experiencia laboral y trayectoria profesional.
              </p>
              <p className="text-xs mt-2">
                Empresas donde has trabajado, roles, proyectos destacados...
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {experienceArray.map((exp, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Icono de empresa */}
              <div className="flex-shrink-0 mt-1">
                <Building2 className="w-5 h-5 text-gray-500" />
              </div>

              {/* Información del trabajo */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 font-Inter">
                  {exp.title}
                </h3>
                <p className="text-sm text-theme-button-primary font-medium font-Inter">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-500 font-Inter mt-1">
                  {exp.period}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-600 font-Inter mt-2">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
