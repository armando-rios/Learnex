import { useState } from 'react';
import { X, User, Mail, Github, Linkedin, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateMyProfile } from '../hooks/useProfile';
import type { UserProfile } from '../services/profileService';
import InputField from '../../auth/components/InputField';
import TextareaField from '../../auth/components/TextareaField';
import useAuthStore from '../../auth/store/useAuthStore';

const profileSchema = z.object({
  bio: z
    .string()
    .min(10, 'La biografía debe tener al menos 10 caracteres')
    .max(500, 'La biografía no puede exceder 500 caracteres'),
  location: z.string().min(1, 'La ubicación es requerida'),
  skills: z.string().min(1, 'Agrega al menos una habilidad'),
  experience: z.string().optional(),
  interests: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  contactEmail: z.string().email('Email inválido'),
  contactPhone: z.string().optional(),
  ocupation: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  section?: 'all' | 'about' | 'skills' | 'contact' | 'experience' | 'interests';
}

const EditProfileModal = ({
  isOpen,
  onClose,
  profile,
  section = 'all',
}: EditProfileModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const updateProfileMutation = useUpdateMyProfile(); // Usar useUpdateMyProfile
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: profile.bio || '',
      location: profile.location || '',
      skills: Array.isArray(profile.skills)
        ? profile.skills.filter(Boolean).join(', ')
        : '',
      experience: profile.experience || '',
      interests: Array.isArray(profile.interests)
        ? profile.interests.filter(Boolean).join(', ')
        : '',
      socialLinks: {
        linkedin: profile.socialLinks?.linkedin || '',
        github: profile.socialLinks?.github || '',
      },
      contactEmail: profile.contactEmail || profile.email || '',
      contactPhone: profile.contactPhone || '',
      ocupation: profile.ocupation || '',
    },
  });

  // Watch para contador de caracteres y preview
  const bioValue = watch('bio');
  const skillsValue = watch('skills');
  const interestsValue = watch('interests');

  // Preview de skills e interests
  const skillsPreview = skillsValue
    ? skillsValue
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const interestsPreview = interestsValue
    ? interestsValue
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Función para obtener color consistente por habilidad
  const getSkillColor = (skill: string) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-orange-100 text-orange-700',
      'bg-green-100 text-green-700',
      'bg-red-100 text-red-700',
      'bg-purple-100 text-purple-700',
      'bg-yellow-100 text-yellow-700',
      'bg-indigo-100 text-indigo-700',
      'bg-pink-100 text-pink-700',
    ];

    let hash = 0;
    for (let i = 0; i < skill.length; i++) {
      hash = skill.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  // Función para obtener color consistente por interés
  const getInterestColor = (interest: string) => {
    const colors = [
      'bg-purple-100 text-purple-700 border-purple-200',
      'bg-green-100 text-green-700 border-green-200',
      'bg-blue-100 text-blue-700 border-blue-200',
      'bg-orange-100 text-orange-700 border-orange-200',
      'bg-pink-100 text-pink-700 border-pink-200',
      'bg-indigo-100 text-indigo-700 border-indigo-200',
    ];

    let hash = 0;
    for (let i = 0; i < interest.length; i++) {
      hash = interest.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  // Función para obtener emoji dinámico para intereses
  const getEmojiForInterest = (interest: string) => {
    const lowerInterest = interest.toLowerCase();

    const emojiMap = {
      // Carrera/Trabajo
      'primer empleo': '🚀',
      empleo: '💼',
      trabajo: '💼',
      carrera: '🚀',
      entrevista: '🎯',
      transición: '🔄',
      cv: '📄',
      resume: '📄',
      networking: '🤝',

      // Tecnología
      react: '⚛️',
      javascript: '🟨',
      python: '🐍',
      web: '🌐',
      frontend: '🎨',
      backend: '⚙️',
      ecosistema: '🌐',
      desarrollo: '💻',
      programación: '💻',
      código: '💻',
      node: '🟢',
      angular: '🔴',
      vue: '💚',
      css: '🎨',
      html: '📄',
      docker: '🐳',
      kubernetes: '☸️',
      aws: '☁️',
      azure: '☁️',
      cloud: '☁️',

      // Soft skills y otros
      comunicación: '💬',
      liderazgo: '👑',
      teamwork: '🤝',
      equipo: '🤝',
      creatividad: '💡',
      innovación: '💡',
      'problem solving': '🧩',
      resolución: '🧩',
      diseño: '🎨',
      ux: '🎨',
      ui: '🎨',
      data: '📊',
      'machine learning': '🤖',
      ai: '🤖',
      'inteligencia artificial': '🤖',
      blockchain: '⛓️',
      devops: '🔧',
      testing: '🧪',
      qa: '🧪',
    };

    // Buscar coincidencias en el texto
    for (const [keyword, emoji] of Object.entries(emojiMap)) {
      if (lowerInterest.includes(keyword)) {
        return emoji;
      }
    }

    return '✨'; // Default
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      // Preparar datos para enviar al backend
      const updateData: Partial<UserProfile> = {
        bio: data.bio,
        location: data.location,
        skills: data.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
        experience: data.experience || '',
        interests: data.interests
          ? data.interests
              .split(',')
              .map((int) => int.trim())
              .filter(Boolean)
          : [],
        socialLinks: {
          linkedin: data.socialLinks.linkedin || '',
          github: data.socialLinks.github || '',
        },
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone || '',
        ocupation: data.ocupation || '',
        name: profile.name || user?.name || '',
        countryId: profile.countryId || '',
        certifications: profile.certifications || [],
        password: '',
        imageUrl: profile.imageUrl || '',
      };

      console.log('Sending update data:', updateData);

      await updateProfileMutation.mutateAsync(updateData);

      // Mostrar mensaje de éxito
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
        reset();
        // Recargar la página para mostrar los cambios y las estadísticas demo
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-theme-bg-primary/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header sticky */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {section === 'all' ? 'Editar Perfil' : 'Editar Sección'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensaje de éxito */}
        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 m-6 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              ¡Perfil actualizado exitosamente!
            </span>
          </div>
        )}

        {/* Form scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* 1. Biografía */}
            {(section === 'all' || section === 'about') && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Biografía
                </h3>

                <div>
                  <TextareaField
                    label="Cuéntanos sobre ti"
                    placeholder="Describe tu experiencia, pasiones y lo que te motiva..."
                    register={register('bio')}
                    error={errors.bio?.message}
                    rows={4}
                    labelColor="text-gray-700"
                    inputBg="bg-gray-50"
                  />
                  {/* Contador de caracteres */}
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      Mínimo 10 caracteres para una buena descripción
                    </span>
                    <span
                      className={`text-xs ${bioValue && bioValue.length > 450 ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      {bioValue?.length || 0}/500
                    </span>
                  </div>
                </div>

                {/* Ocupación */}
                <InputField
                  label="Ocupación"
                  type="text"
                  placeholder="Ej: Estudiante de Ingeniería, Senior Developer, etc."
                  register={register('ocupation')}
                  error={errors.ocupation?.message}
                  labelColor="text-gray-700"
                  inputBg="bg-gray-50"
                />
              </div>
            )}

            {/* 2. Información de Contacto */}
            {(section === 'all' || section === 'contact') && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Información de Contacto
                </h3>

                <InputField
                  label="Email"
                  type="email"
                  placeholder="tu@email.com"
                  register={register('contactEmail')}
                  error={errors.contactEmail?.message}
                  labelColor="text-gray-700"
                  inputBg="bg-gray-50"
                />

                <InputField
                  label="Ubicación"
                  type="text"
                  placeholder="Ciudad, País"
                  register={register('location')}
                  error={errors.location?.message}
                  labelColor="text-gray-700"
                  inputBg="bg-gray-50"
                />

                <InputField
                  label="Teléfono (opcional)"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  register={register('contactPhone')}
                  error={errors.contactPhone?.message}
                  labelColor="text-gray-700"
                  inputBg="bg-gray-50"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      LinkedIn
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2.5 bg-gray-200 text-gray-600 text-sm rounded-l-lg border border-r-0 border-theme-border-primary">
                        linkedin.com/in/
                      </span>
                      <input
                        type="text"
                        placeholder="tu-usuario"
                        className="flex-1 border border-theme-border-primary rounded-r-lg px-4 py-2.5 placeholder-theme-placeholder-primary focus:outline-none focus:ring-2 focus:ring-theme-button-primary focus:border-transparent transition-all text-sm bg-gray-50"
                        {...register('socialLinks.linkedin')}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      Solo tu nombre de usuario (ej: juan-perez)
                    </span>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm flex items-center gap-2">
                      <Github className="w-4 h-4 text-gray-700" />
                      GitHub
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2.5 bg-gray-200 text-gray-600 text-sm rounded-l-lg border border-r-0 border-theme-border-primary">
                        github.com/
                      </span>
                      <input
                        type="text"
                        placeholder="tu-usuario"
                        className="flex-1 border border-theme-border-primary rounded-r-lg px-4 py-2.5 placeholder-theme-placeholder-primary focus:outline-none focus:ring-2 focus:ring-theme-button-primary focus:border-transparent transition-all text-sm bg-gray-50"
                        {...register('socialLinks.github')}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      Solo tu nombre de usuario (ej: juanperez)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Habilidades */}
            {(section === 'all' || section === 'skills') && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Habilidades
                </h3>

                <div>
                  <InputField
                    label="Habilidades técnicas"
                    type="text"
                    placeholder="React, JavaScript, Node.js, etc."
                    register={register('skills')}
                    error={errors.skills?.message}
                    labelColor="text-gray-700"
                    inputBg="bg-gray-50"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Separa las habilidades con comas
                  </p>

                  {/* Preview de habilidades con colores consistentes */}
                  {skillsPreview.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm font-medium text-gray-900 block mb-2">
                        Vista previa:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {skillsPreview.map((skill, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getSkillColor(skill)}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. Intereses */}
            {(section === 'all' || section === 'interests') && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user?.role === 'ROLE_MENTOR'
                    ? 'Especialidades de Mentoría'
                    : 'Objetivos de Aprendizaje'}
                </h3>

                <div>
                  <TextareaField
                    label={
                      user?.role === 'ROLE_MENTOR'
                        ? 'En qué temas puedes ayudar como mentor'
                        : 'Qué te interesa aprender'
                    }
                    placeholder={
                      user?.role === 'ROLE_MENTOR'
                        ? 'Transición de carrera, Entrevistas técnicas, React y ecosistema, etc.'
                        : 'Primer empleo en tech, Frontend development, React, etc.'
                    }
                    register={register('interests')}
                    error={errors.interests?.message}
                    rows={3}
                    labelColor="text-gray-700"
                    inputBg="bg-gray-50"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {user?.role === 'ROLE_MENTOR'
                      ? 'Temas en los que puedes guiar a estudiantes (Separa con comas)'
                      : 'Temas que te motivan y quieres explorar (Separa con comas)'}
                  </p>

                  {/* Preview de intereses con emojis dinámicos y colores consistentes */}
                  {interestsPreview.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm font-medium text-gray-900 block mb-2">
                        Vista previa:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {interestsPreview.map((interest, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getInterestColor(interest)}`}
                          >
                            <span className="text-base">
                              {getEmojiForInterest(interest)}
                            </span>
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. Experiencia */}
            {(section === 'all' || section === 'experience') && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experiencia
                </h3>

                <div>
                  <TextareaField
                    label={
                      user?.role === 'ROLE_MENTOR'
                        ? 'Experiencia profesional'
                        : 'Experiencia académica y proyectos'
                    }
                    placeholder={
                      user?.role === 'ROLE_MENTOR'
                        ? 'Empresas donde has trabajado, roles, proyectos destacados...'
                        : 'Proyectos universitarios, prácticas, trabajos de medio tiempo...'
                    }
                    register={register('experience')}
                    error={errors.experience?.message}
                    rows={4}
                    labelColor="text-gray-700"
                    inputBg="bg-gray-50"
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || updateProfileMutation.isPending}
                className="flex-1 px-4 py-2 bg-theme-button-primary text-white rounded-lg hover:bg-theme-button-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting || updateProfileMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Guardando...
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
