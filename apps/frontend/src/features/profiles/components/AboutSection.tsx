import type { UserProfile } from '../services/profileService';

interface AboutSectionProps {
  profile: UserProfile | undefined;
}

const AboutSection = ({ profile }: AboutSectionProps) => {
  const isEmpty = !profile?.bio || profile.bio.trim() === '';

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-4 font-Inter">
      <h2 className="text-xl font-bold text-gray-900 font-Inter mb-4">
        Acerca de mí
      </h2>

      <div className="text-gray-700 leading-relaxed font-Inter">
        {isEmpty ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">
              Completa tu biografía para que otros puedan conocerte mejor.
            </p>
            <p className="text-xs mt-2">
              Comparte tus intereses, experiencia y lo que te apasiona. Esto
              ayudará a otros a entender quién eres y cómo puedes colaborar.
            </p>
          </div>
        ) : (
          <p>{profile.bio}</p>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
