import { useNavigate } from 'react-router-dom';

const AuthHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="absolute top-6 left-6 z-10">
      {/* Logo clickeable */}
      <button
        onClick={handleLogoClick}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
      >
        <img
          src="/logos/skilllink-logo-dark.svg"
          alt="SkillLink Logo"
          className="h-12 lg:h-18 w-auto"
        />
      </button>
    </div>
  );
};

export default AuthHeader;
