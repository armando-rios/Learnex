import type { UserProfile } from '../services/profileService';
import InterestsSection from './InterestsSection';

interface MentoringSpecialtiesSectionProps {
  profile: UserProfile | undefined;
}

const MentoringSpecialtiesSection = ({
  profile,
}: MentoringSpecialtiesSectionProps) => {
  // No mostrar si no hay intereses
  if (!profile?.interests || profile.interests.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-4 font-Inter">
      <h2 className="text-xl font-bold text-gray-900 font-Inter mb-4">
        Especialidades de Mentoría
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        Áreas en las que puedo ayudar como mentor:
      </p>
      <InterestsSection profile={profile} />
    </div>
  );
};

export default MentoringSpecialtiesSection;
