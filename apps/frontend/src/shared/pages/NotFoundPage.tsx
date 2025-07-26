import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Logo */}
      <div className="fixed left-14 z-50">
        <button
          onClick={handleGoHome}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
        >
          <img
            src="/logos/skillLink-logo-dark.svg"
            alt="SkillLink Logo"
            className="w-48 h-48"
          />
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contenido de texto - Columna izquierda */}
          <div className="text-left space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Oh no...
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
                Página no encontrada
              </h2>
            </div>

            <div className="space-y-2">
              <p className="text-lg text-gray-600">
                Esta página no existe o fue removida.
              </p>
              <p className="text-lg text-gray-600">
                Te recomendamos volver al inicio.
              </p>
            </div>

            {/* Botón de regreso */}
            <div className="pt-4">
              <button
                onClick={handleGoHome}
                className="
                  inline-flex items-center gap-2
                  bg-theme-button-primary hover:bg-theme-button-primary/90
                  text-white font-semibold
                  px-6 py-3 lg:px-8 lg:py-4
                  rounded-lg
                  transition-all duration-300
                  transform hover:-translate-y-1 hover:shadow-lg
                  text-base lg:text-lg
                "
              >
                ← Inicio
              </button>
            </div>
          </div>

          {/* Imagen */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="w-full max-w-lg lg:max-w-xl text-center space-y-8">
              <img
                src="/images/error-ilustration.svg"
                alt="Ilustración de error 404"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
