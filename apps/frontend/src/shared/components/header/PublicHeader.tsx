import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

const PublicHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();

  // Función para scroll suave a secciones con offset
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('header')?.clientHeight || 0;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  // Detectar la sección activa
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['hero', 'roles', 'explorar', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Manejar clicks en navegación
  const handleNavClick = (sectionId: string) => {
    if (location.pathname === '/') {
      // Si estamos en la página de inicio, hacer scroll
      scrollToSection(sectionId);
    } else {
      // Si estamos en otra página, navegar a inicio con hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header className="h-16 md:h-20 fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-theme-button-primary to-theme-button-secondary shadow-lg backdrop-blur-sm">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo clickeable con scroll al hero*/}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/logos/skilllink-logo-light.svg"
              alt="SkillLink Logo"
              className="h-12 lg:h-18 w-auto"
            />
          </button>

          {/* Navigation Links con indicador visual mejorado */}
          {location.pathname === '/' && (
            <nav className="hidden lg:flex items-center gap-8 flex-1 ml-16">
              <button
                onClick={() => handleNavClick('hero')}
                className={`text-white/90 hover:text-white font-medium transition-all duration-300 relative pb-1 ${
                  activeSection === 'hero' ? 'text-white' : ''
                }`}
              >
                Inicio
                {/* Línea indicadora */}
                {activeSection === 'hero' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full shadow-lg"></div>
                )}
              </button>
              <button
                onClick={() => handleNavClick('roles')}
                className={`text-white/90 hover:text-white font-medium transition-all duration-300 relative pb-1 ${
                  activeSection === 'roles' ? 'text-white' : ''
                }`}
              >
                Cómo participar
                {activeSection === 'roles' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full shadow-lg"></div>
                )}
              </button>
              <button
                onClick={() => handleNavClick('explorar')}
                className={`text-white/90 hover:text-white font-medium transition-all duration-300 relative pb-1 ${
                  activeSection === 'explorar' ? 'text-white' : ''
                }`}
              >
                Explorar
                {activeSection === 'explorar' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full shadow-lg"></div>
                )}
              </button>
              <button
                onClick={() => handleNavClick('contacto')}
                className={`text-white/90 hover:text-white font-medium transition-all duration-300 relative pb-1 ${
                  activeSection === 'contacto' ? 'text-white' : ''
                }`}
              >
                Contáctanos
                {activeSection === 'contacto' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full shadow-lg"></div>
                )}
              </button>
            </nav>
          )}

          {/* Auth Buttons + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Inicia sesión -- Solo visible en desktop y tablet */}
            <button
              onClick={() => navigate('/iniciar-sesion')}
              className="hidden sm:block px-3 lg:px-6 py-2 text-white/90 hover:text-white font-medium transition-colors duration-300 text-sm lg:text-base cursor-pointer"
            >
              Inicia sesión
            </button>

            {/* Regístrate */}
            <button
              onClick={() => navigate('/registrarse')}
              className="px-3 sm:px-4 lg:px-6 py-2 lg:py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg text-xs sm:text-sm lg:text-base cursor-pointer"
            >
              Regístrate
            </button>

            {/* Mobile Menu Button */}
            {location.pathname === '/' && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {location.pathname === '/' && mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-white/20">
            <nav className="flex flex-col py-4 px-6 space-y-4">
              {/* Inicia sesión en el menú móvil */}
              <button
                onClick={() => {
                  navigate('/iniciar-sesion');
                  setMobileMenuOpen(false);
                }}
                className="text-theme-button-primary hover:text-theme-button-secondary font-semibold transition-colors duration-300 text-left py-2 border-b border-gray-200 cursor-pointer"
              >
                Inicia sesión
              </button>

              {/* Navegación */}
              <button
                onClick={() => {
                  handleNavClick('hero');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-800 hover:text-theme-button-primary font-medium transition-colors duration-300 text-left"
              >
                Inicio
              </button>
              <button
                onClick={() => {
                  handleNavClick('roles');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-800 hover:text-theme-button-primary font-medium transition-colors duration-300 text-left"
              >
                Cómo funciona
              </button>
              <button
                onClick={() => {
                  handleNavClick('explorar');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-800 hover:text-theme-button-primary font-medium transition-colors duration-300 text-left"
              >
                Explorar
              </button>
              <button
                onClick={() => {
                  handleNavClick('contacto');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-800 hover:text-theme-button-primary font-medium transition-colors duration-300 text-left"
              >
                Contáctanos
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
