import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../../../shared/components/Button';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="bg-theme-bg-primary text-theme-text-primary relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-green-600/20"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Layout responsive: columna en móvil y tablet, grid en desktop grande */}
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6 lg:gap-8 xl:gap-16 2xl:gap-20 items-center min-h-[80vh]">
          {/* Hero image */}
          <div className="order-1 xl:order-2 flex items-center justify-center xl:justify-end">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Pantalla de computadora con código de programación"
              className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Text content */}
          <div className="order-2 xl:order-1 text-left space-y-4 lg:space-y-6">
            {/* Título que se mantiene en una línea en pantallas grandes */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight bg-gradient-to-r from-theme-text-primary to-theme-text-secondary bg-clip-text text-transparent">
              Aprende, crece y conecta
            </h1>

            <p className="text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-theme-text-secondary max-w-2xl leading-relaxed">
              ¿Quieres aprender nuevas habilidades o compartir tu experiencia?
              Conecta con una comunidad donde estudiantes encuentran mentores
              expertos y profesionales comparten conocimiento. Crece
              profesionalmente mientras ayudas a otros a alcanzar sus metas.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2">
              <Link to="/registrarse">
                <ButtonPrimary
                  title="Únete gratis"
                  styles="text-base lg:text-lg xl:text-xl px-6 lg:px-8 xl:px-10 py-3 lg:py-4 xl:py-5 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                />
              </Link>

              <a
                href="#explorar"
                className="inline-flex items-center justify-center px-6 lg:px-8 xl:px-10 py-3 lg:py-4 xl:py-5 border-2 border-theme-text-primary text-theme-text-primary rounded-lg font-semibold text-base lg:text-lg xl:text-xl hover:bg-theme-text-primary hover:text-theme-bg-primary transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                Descubre más
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
