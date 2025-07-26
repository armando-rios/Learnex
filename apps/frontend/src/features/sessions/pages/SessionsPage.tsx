import { useState } from 'react';
import { Calendar, Bell, CheckCircle } from 'lucide-react';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import { useSessionsData, type SessionData } from '../hooks/useSessionsData';
import SessionCard from '../components/SessionCard';

const StudentSessionsPage = () => {
  const [viewMode, setViewMode] = useState('timeline');
  const { upcomingSessions, completedSessions, stats } = useSessionsData();

  const handleSessionAction = (session: SessionData) => {
    alert(`Acción para "${session.title}" próximamente disponible`);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header con breadcrumb */}
      <div className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 font-Inter">
          <Breadcrumb />
          <h1 className="text-2xl lg:text-3xl font-bold text-green-600 font-Inter mt-1">
            Mis Sesiones
          </h1>
        </div>
      </div>

      {/* Header con gradiente */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-theme-button-primary to-theme-button-secondary bg-clip-text text-transparent mb-2">
                Timeline de Aprendizaje
              </h2>
              <p className="text-gray-600">
                Gestiona tus mentorías y sesiones de crecimiento
              </p>
            </div>

            {/* Toggle de vista */}
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-full p-1 flex">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'timeline'
                      ? 'bg-white text-theme-button-primary shadow-sm'
                      : 'text-gray-600 hover:text-theme-button-primary'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => {
                    setViewMode('calendar');
                    alert('Vista de calendario próximamente');
                  }}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-theme-button-primary transition-all"
                >
                  Calendario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="space-y-8">
            {/* Próximas sesiones */}
            {upcomingSessions.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-500" />
                  Próximas Sesiones ({upcomingSessions.length})
                </h3>

                <div className="relative">
                  {/* Línea temporal */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-theme-button-primary to-theme-button-secondary"></div>

                  {upcomingSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      variant="timeline"
                      onAction={handleSessionAction}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sesiones completadas */}
            {completedSessions.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Sesiones Completadas ({completedSessions.length})
                </h3>

                <div className="space-y-4">
                  {completedSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      variant="compact"
                      onAction={handleSessionAction}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Estado vacío */}
            {upcomingSessions.length === 0 &&
              completedSessions.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    ¡Comienza tu journey de aprendizaje!
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    No tienes sesiones programadas aún. Explora mentores
                    expertos y agenda tu primera sesión para impulsar tu
                    carrera.
                  </p>
                  <button className="bg-gradient-to-r from-theme-button-primary to-theme-button-secondary hover:opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg">
                    Explorar Mentores
                  </button>
                </div>
              )}

            {/* Estadísticas de progreso */}
            {stats.total > 0 && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Tu Progreso de Aprendizaje
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-theme-button-primary">
                      {stats.total}
                    </div>
                    <div className="text-sm text-gray-600">Total Sesiones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {stats.upcoming}
                    </div>
                    <div className="text-sm text-gray-600">Próximas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.completed}
                    </div>
                    <div className="text-sm text-gray-600">Completadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-theme-button-secondary">
                      {stats.totalHours.toFixed(1)}h
                    </div>
                    <div className="text-sm text-gray-600">
                      Horas Aprendidas
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSessionsPage;
