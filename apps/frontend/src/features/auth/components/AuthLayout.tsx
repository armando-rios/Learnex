import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  showBackButton?: boolean;
}

const AuthLayout = ({
  children,
  title,
  description,
  image,
  showBackButton = true,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-theme-bg-secondary flex items-center justify-center py-12">
      {/* Logo en la esquina superior izquierda */}
      {/* <div className="absolute top-6 left-6">
        <div className="flex items-center gap-3">
          <img
            src="../../public/logos/skilllink-logo-dark.svg"
            alt="SkillLink Logo"
            className="w-40 h-24"
          />
        </div>
      </div> */}

      <div className="w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Lado izquierdo - Imagen */}
        {image && (
          <div className="hidden lg:flex items-center justify-center">
            <img
              src={image}
              alt="Auth visual"
              className="w-full max-w-lg object-contain"
            />
          </div>
        )}

        {/* Lado derecho - Formulario */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-theme-bg-primary rounded-2xl shadow-xl p-8 text-white mb-20">
            {/* Botón de regresar - solo si se especifica */}
            {showBackButton && (
              <div className="flex items-center gap-2 mb-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Regresar
                </Link>
              </div>
            )}

            {/* Título */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <p className="text-white/80">{description}</p>
            </div>

            {/* Contenido del formulario */}
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm lg:text-base text-theme-text-muted">
            &copy; {new Date().getFullYear()} SkillLink. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
