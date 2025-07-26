import useAuthStore from '../../auth/store/useAuthStore';
import type { UserProfile } from '../services/profileService';

interface InterestsSectionProps {
  profile: UserProfile | undefined;
}

const InterestsSection = ({ profile }: InterestsSectionProps) => {
  const { user } = useAuthStore();
  const isStudent = user?.role === 'ROLE_USER';
  const isEmpty =
    !profile?.interests ||
    profile.interests.length === 0 ||
    (profile.interests.length === 1 && profile.interests[0] === '');

  // Función para obtener emoji basado en palabras clave
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-4 font-Inter">
      <h2 className="text-xl font-bold text-gray-900 font-Inter mb-4">
        Intereses
      </h2>

      {isEmpty ? (
        <div className="text-center py-8 text-gray-400">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
          </div>
          {isStudent ? (
            <>
              <p className="text-sm">
                Comparte qué te interesa aprender para conectar con mentores
                afines.
              </p>
              <p className="text-xs mt-2">
                React, Primer empleo, Frontend development, etc.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm">
                Comparte en qué temas puedes ayudar como mentor.
              </p>
              <p className="text-xs mt-2">
                Transición de carrera, Entrevistas técnicas, Liderazgo, etc.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile.interests
            .filter((interest) => interest && interest.trim() !== '') // Filtrar intereses vacíos
            .map((interest) => (
              <span
                key={interest}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getInterestColor(interest)}`}
              >
                <span className="text-base">
                  {getEmojiForInterest(interest)}
                </span>
                {interest}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default InterestsSection;
