import { useEffect, useState } from 'react';
import useAuthStore from '../../auth/store/useAuthStore';
import OpportunityCard from '../../../shared/components/OpportunityCard';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  Star,
  Target,
  Award,
  ChevronRight,
  PlusCircle,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  getMyLearning,
  type OpportunityCardType,
} from '../services/dashboardService';

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
  value: string;
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

const EmptyState = ({
  isStudent,
  onExploreClick,
  onCreateClick,
}: {
  isStudent: boolean;
  onExploreClick: () => void;
  onCreateClick: () => void;
}) => {
  return (
    <div className="bg-theme-bg-quaternary rounded-xl shadow-sm border border-theme-border-light p-8 sm:p-12 text-center">
      {/* Ilustración con iconos */}
      <div className="relative mb-6">
        {/* Círculo de fondo con gradiente */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mx-auto flex items-center justify-center mb-4 relative">
          {/* Iconos flotantes */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-yellow-600" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <PlusCircle className="w-3 h-3 text-green-600" />
          </div>

          {/* Icono principal */}
          {isStudent ? (
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-theme-button-primary" />
          ) : (
            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-theme-button-primary" />
          )}
        </div>
      </div>

      {/* Texto principal */}
      <div className="mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-theme-text-dark mb-3">
          {isStudent
            ? '¡Tu journey está por comenzar!'
            : '¡Hora de compartir tu conocimiento!'}
        </h3>
        <p className="text-theme-text-muted text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          {isStudent
            ? 'Aún no tienes contenido en tu aprendizaje. ¡Explora cursos, proyectos y mentorías para comenzar a crecer profesionalmente!'
            : 'No tienes oportunidades creadas aún. ¡Crea tu primer curso o mentoría y comienza a ayudar a estudiantes a alcanzar sus metas!'}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <button
          onClick={onExploreClick}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-theme-button-primary text-white rounded-lg hover:bg-theme-button-primary/90 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg font-medium"
        >
          <Search className="w-5 h-5" />
          {isStudent ? 'Explorar Contenido' : 'Ver Oportunidades'}
        </button>

        {!isStudent && (
          <button
            onClick={onCreateClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-theme-button-primary text-theme-button-primary rounded-lg hover:bg-theme-button-primary hover:text-white transition-all duration-200 transform hover:-translate-y-0.5 font-medium"
          >
            <PlusCircle className="w-5 h-5" />
            Crear Contenido
          </button>
        )}
      </div>

      {/* Tips adicionales */}
      <div className="mt-8 pt-6 border-t border-theme-border-light">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-theme-text-muted">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>
            {isStudent
              ? 'Tip: Comienza con cursos básicos para construir tu base de conocimiento'
              : 'Tip: Comparte tu experiencia en áreas donde tienes más de 2 años de práctica'}
          </span>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [myLearning, setMyLearning] = useState<OpportunityCardType[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMyLearning() {
    if (user) {
      const getLearning = await getMyLearning();
      setMyLearning(getLearning);
    }
  }

  useEffect(() => {
    fetchMyLearning();
    // Simular carga
    setTimeout(() => setLoading(false), 800);
  }, []);

  const isStudent = user?.role === 'ROLE_USER';
  const userName = user?.name || 'Usuario';

  // Estadísticas simples por rol
  const stats = isStudent
    ? [
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'Cursos Activos',
          value: '3',
          color: 'blue',
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Mentorías',
          value: '5',
          color: 'green',
        },
        {
          icon: <Target className="w-6 h-6" />,
          title: 'Proyectos',
          value: '2',
          color: 'purple',
        },
        {
          icon: <Award className="w-6 h-6" />,
          title: 'Logros',
          value: '8',
          color: 'orange',
        },
      ]
    : [
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Estudiantes',
          value: '12',
          color: 'blue',
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          title: 'Sesiones',
          value: '24',
          color: 'green',
        },
        {
          icon: <Star className="w-6 h-6" />,
          title: 'Rating',
          value: '4.8',
          color: 'purple',
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: 'Horas',
          value: '156',
          color: 'orange',
        },
      ];

  // Acciones rápidas por rol
  const actions = isStudent
    ? [
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'Explorar Cursos',
          description: 'Descubre nuevas oportunidades',
          onClick: () => navigate('/explorar'),
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Buscar Mentores',
          description: 'Encuentra expertos en tu área',
          onClick: () => navigate('/mentores'),
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          title: 'Mis Sesiones',
          description: 'Revisa tus mentorías programadas',
          onClick: () => navigate('/sesiones'),
        },
        {
          icon: <MessageCircle className="w-6 h-6" />,
          title: 'Mensajes',
          description: 'Conecta con tu comunidad',
          onClick: () => navigate('/mensajes'),
        },
      ]
    : [
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Mis Estudiantes',
          description: 'Gestiona tu comunidad',
          onClick: () => navigate('/conexiones'),
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          title: 'Crear Sesión',
          description: 'Programa nueva mentoría',
          onClick: () => navigate('/sesiones'),
        },
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'Crear Contenido',
          description: 'Comparte tu conocimiento',
          onClick: () => navigate('/oportunidades'),
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          title: 'Calendario',
          description: 'Ve todas tus sesiones programadas',
          onClick: () => navigate('/calendario'),
        },
      ];

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
              {isStudent ? 'Continúa tu aprendizaje' : 'Ayuda a otros a crecer'}
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
          {/* Estadísticas */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-theme-text-dark mb-4 sm:mb-6">
              Tu Actividad
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  title={stat.title}
                  value={stat.value}
                  color={stat.color as 'blue' | 'green' | 'purple' | 'orange'}
                />
              ))}
            </div>
          </section>

          {/* Acciones rápidas */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-theme-text-dark mb-4 sm:mb-6">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {actions.map((action, index) => (
                <ActionCard key={index} {...action} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {isStudent ? 'Recomendado para Ti' : 'Nuevas Oportunidades'}
            </h2>

            {myLearning.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myLearning.map((item) => {
                  return (
                    <OpportunityCard
                      id={item.contentPreview.id}
                      key={item.contentPreview.id}
                      type={item.contentType}
                      title={item.contentPreview.title}
                      description={item.contentPreview.description}
                      tagsName={item.contentPreview.tags}
                      difficultyLevel={item.contentPreview.difficultyLevel}
                      deadline={item.contentPreview.deadline}
                      buttonTitle={
                        user?.role === 'ROLE_USER' ? 'Continuar' : 'Gestionar'
                      }
                      onClick={() => console.log('Hace click')}
                    />
                  );
                })}
              </div>
            ) : (
              <EmptyState
                isStudent={isStudent}
                onExploreClick={() =>
                  navigate(isStudent ? '/explorar' : '/oportunidades')
                }
                onCreateClick={() => navigate('/oportunidades/crear')}
              />
            )}
          </section>

          <div className="h-8 sm:h-12"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
