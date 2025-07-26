import HeroSection from '../components/homePage/HeroSection';
import RolesSection from '../components/homePage/RolesSection';
import ContactSection from '../components/homePage/ContactSection';
import ExploreSection from '../components/homePage/ExploreSection';

const HomePage = () => {
  return (
    <div className="flex-1">
      <HeroSection />
      <RolesSection />
      <ExploreSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
