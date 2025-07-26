import type { UserProfile } from '../services/profileService';
import InterestsSection from './InterestsSection';

interface LearningGoalsSectionProps {
  profile: UserProfile | undefined;
}

const LearningGoalsSection = ({ profile }: LearningGoalsSectionProps) => {
  // No mostrar si no hay intereses
  if (!profile?.interests || profile.interests.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-4 font-Inter">
      <h2 className="text-xl font-bold text-gray-900 font-Inter mb-4">
        Objetivos de Aprendizaje
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        Lo que quiero aprender y desarrollar:
      </p>
      <InterestsSection profile={profile} />
    </div>
  );
};

export default LearningGoalsSection;
