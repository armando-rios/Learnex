import type { UserProfile } from '../services/profileService';
import useAuthStore from '../../auth/store/useAuthStore';

interface SkillsSectionProps {
  profile: UserProfile | undefined;
}

const SkillsSection = ({ profile }: SkillsSectionProps) => {
  const { user } = useAuthStore();
  const isEmpty =
    !profile?.skills ||
    profile.skills.length === 0 ||
    (profile.skills.length === 1 && profile.skills[0] === '');
  const isStudent = user?.role === 'ROLE_USER';

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

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-4 font-Inter">
      <h2 className="text-xl font-bold text-gray-900 font-Inter mb-4">
        Habilidades
      </h2>

      {isEmpty ? (
        <div className="text-center py-8 text-gray-400">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-2xl">🛠️</span>
            </div>
          </div>
          <p className="text-sm">
            {isStudent
              ? 'Agrega las habilidades que has aprendido o que estás desarrollando.'
              : 'Comparte las tecnologías y habilidades en las que eres experto.'}
          </p>
          <p className="text-xs mt-2">
            React, JavaScript, Python, Design Thinking, etc.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile.skills
            .filter((skill) => skill && skill.trim() !== '') // Filtrar skills vacías
            .map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1 rounded-full text-sm font-medium font-Inter ${getSkillColor(skill)}`}
              >
                {skill}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
