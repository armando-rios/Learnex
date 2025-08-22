import { useEffect, useState } from 'react';
import useAuthStore from '../../auth/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Calendar,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';

const Breadcrumb = () => {
  return (
    <nav className="flex-1 overflow-y-auto pb-4 sm:pb-6">
      <span className="text-gray-900 font-medium">Inicio</span>
    </nav>
  );
};

// Card de estadística
const StatCard = ({
  icon,
  title,
  value,
  color = 'blue',
}: {
  icon: React.ReactNode;
  title: string;
  value?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}) => {
  const colors: Record<string, string> = {
    // 👈 Tipado correcto
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    green: 'bg-green-50 border-green-100 text-green-600',
    purple: 'bg-purple-50 border-purple-100 text-purple-600',
    orange: 'bg-orange-50 border-orange-100 text-orange-600',
  };

  return (
    <div className="bg-theme-bg-quaternary rounded-xl shadow-sm border border-theme-border-light p-3 sm:p-4 lg:p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <div
          className={`p-2 sm:p-2.5 lg:p-3 rounded-lg flex-shrink-0 ${colors[color]}`}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6">{icon}</div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-theme-text-dark truncate">
            {value}
          </p>
          <p className="text-xs sm:text-sm text-theme-text-muted truncate">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

// Card de acción rápida
const ActionCard = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="bg-theme-bg-quaternary rounded-xl shadow-sm border border-theme-border-light p-4 sm:p-5 lg:p-6 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200"
  >
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="p-2 sm:p-2.5 lg:p-3 bg-blue-50 rounded-lg text-theme-button-primary flex-shrink-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6">{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-theme-text-dark mb-1 text-sm sm:text-base truncate">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-theme-text-muted line-clamp-2">
          {description}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-theme-text-muted flex-shrink-0" />
    </div>
  </div>
);

const DashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga
    setTimeout(() => setLoading(false), 800);
  }, []);

  const userName = user?.fullName || 'Usuario';

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header con breadcrumb y saludo */}
      <div className="sticky top-0 bg-theme-bg-secondary z-10 border-b border-theme-border-light shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Breadcrumb />
          <div className="mt-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
              ¡Hola, {userName}! 👋
            </h1>
            <p className="text-sm sm:text-base text-theme-text-muted mt-1">
              Continúa tu aprendizaje
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-theme-text-dark mb-4 sm:mb-6">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <ActionCard
                icon={<BookOpen />}
                title="Explorar Cursos"
                description="Descubre nuevas oportunidades"
                onClick={() => navigate('/explorar')}
              />
              <ActionCard
                icon={<Users />}
                title="Buscar Mentores"
                description="Encuentra expertos en tu área"
                onClick={() => navigate('/mentores')}
              />

              <ActionCard
                icon={<Calendar />}
                title="Gestionar Sesiones"
                description="Administra tus mentorías"
                onClick={() => navigate('/sesiones')}
              />
              <ActionCard
                icon={<MessageCircle />}
                title="Responder Mensajes"
                description="Conecta con estudiantes"
                onClick={() => navigate('/mensajes')}
              />
            </div>
          </section>
          {/* Estadísticas */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-theme-text-dark mb-4 sm:mb-6">
              Estadísticas
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <StatCard
                icon={<BookOpen />}
                title="Cursos Completados"
                value="12"
              />
              <StatCard
                icon={<Users />}
                title="Mentorías Ofrecidas"
                value="5"
              />
              <StatCard
                icon={<Calendar />}
                title="Sesiones Programadas"
                value="3"
              />
              <StatCard
                icon={<MessageCircle />}
                title="Mensajes Recibidos"
                value="8"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Recomendado para Ti
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Renderizar contenido dinámico */}
            </div>
          </section>

          <div className="h-8 sm:h-12"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
