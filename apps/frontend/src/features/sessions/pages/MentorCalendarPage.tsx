import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, User } from 'lucide-react';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import { useSessionsData, type SessionData } from '../hooks/useSessionsData';
import SessionCard from '../components/SessionCard';

interface CalendarDay {
  day: number;
  date: string;
  sessions: SessionData[];
}

const MentorCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const { sessions, getSessionsForDate, stats } = useSessionsData();

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  // Funciones del calendario
  const navigateMonth = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const getDaysInMonth = (): (CalendarDay | null)[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (CalendarDay | null)[] = [];

    // Días vacíos del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        day,
        date: dateStr,
        sessions: getSessionsForDate(dateStr),
      });
    }

    return days;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const todaysSessions = getSessionsForDate(selectedDate);

  // Handlers
  const handleNewSession = () => {
    alert('Funcionalidad "Crear nueva sesión" próximamente disponible');
  };

  const handleSessionAction = (session: SessionData) => {
    alert(`Gestionar "${session.title}" próximamente disponible`);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header con breadcrumb */}
      <div className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 font-Inter">
          <Breadcrumb />
          <h1 className="text-2xl lg:text-3xl font-bold text-green-600 font-Inter mt-1">
            Calendario
          </h1>
        </div>
      </div>

      {/* Header con gradiente */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-theme-button-primary to-theme-button-secondary bg-clip-text text-transparent mb-2">
                Mi Calendario de Mentorías
              </h2>
              <p className="text-gray-600">
                Gestiona tus sesiones y disponibilidad como mentor
              </p>
            </div>

            <button
              onClick={handleNewSession}
              className="bg-gradient-to-r from-theme-button-primary to-theme-button-secondary hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nueva Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendario principal */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header del calendario */}
                <div className="bg-gradient-to-r from-theme-button-primary to-theme-button-secondary text-white p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      {monthNames[currentDate.getMonth()]}{' '}
                      {currentDate.getFullYear()}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Mes anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Mes siguiente"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid del calendario */}
                <div className="p-6">
                  {/* Headers de días */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(
                      (day) => (
                        <div
                          key={day}
                          className="p-3 text-center text-sm font-medium text-gray-500"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  {/* Días del calendario */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth().map((dayObj, index) => {
                      if (!dayObj) {
                        return <div key={index} className="p-3"></div>;
                      }

                      const isSelected = dayObj.date === selectedDate;
                      const isToday =
                        dayObj.date === new Date().toISOString().split('T')[0];

                      return (
                        <button
                          key={dayObj.date}
                          onClick={() => setSelectedDate(dayObj.date)}
                          className={`p-3 text-center rounded-lg transition-all hover:bg-gray-50 relative ${
                            isSelected
                              ? 'bg-theme-button-primary/10 text-theme-button-primary font-medium'
                              : ''
                          } ${isToday ? 'ring-2 ring-theme-button-primary ring-opacity-50' : ''}`}
                        >
                          <span className="text-sm">{dayObj.day}</span>

                          {/* Indicadores de sesiones */}
                          {dayObj.sessions.length > 0 && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                              {dayObj.sessions
                                .slice(0, 3)
                                .map((session, idx) => (
                                  <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full ${getStatusColor(session.status)}`}
                                  ></div>
                                ))}
                              {dayObj.sessions.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{dayObj.sessions.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar derecho */}
            <div className="lg:col-span-1 space-y-6">
              {/* Sesiones del día seleccionado */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sesiones del día
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(selectedDate).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                {todaysSessions.length > 0 ? (
                  <div className="space-y-4">
                    {todaysSessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        variant="calendar"
                        onAction={handleSessionAction}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm mb-3">
                      No hay sesiones programadas
                    </p>
                    <button
                      onClick={handleNewSession}
                      className="text-theme-button-primary text-sm font-medium hover:text-theme-button-secondary transition-colors"
                    >
                      Programar sesión
                    </button>
                  </div>
                )}
              </div>

              {/* Estadísticas del mes */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumen del Mes
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Total sesiones
                    </span>
                    <span className="font-semibold text-gray-900">
                      {stats.total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confirmadas</span>
                    <span className="font-semibold text-theme-button-primary">
                      {stats.confirmed}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pendientes</span>
                    <span className="font-semibold text-yellow-600">
                      {stats.pending}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Horas totales</span>
                    <span className="font-semibold text-theme-button-secondary">
                      {stats.totalHours.toFixed(1)}h
                    </span>
                  </div>
                </div>
              </div>

              {/* Próximas sesiones */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Próximas Sesiones
                </h3>
                <div className="space-y-3">
                  {sessions
                    .filter((session) => new Date(session.date) >= new Date())
                    .sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    )
                    .slice(0, 3)
                    .map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm shadow-sm">
                          {session.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {session.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {session.student} • {session.time}
                          </p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(session.status)}`}
                        ></div>
                      </div>
                    ))}

                  {sessions.filter(
                    (session) => new Date(session.date) >= new Date()
                  ).length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No hay próximas sesiones programadas
                    </p>
                  )}
                </div>
              </div>

              {/* Tips para mentores */}
              <div className="bg-gradient-to-br from-theme-button-primary/5 to-theme-button-secondary/5 rounded-2xl p-6 border border-theme-button-primary/20">
                <h3 className="text-lg font-semibold text-theme-button-primary mb-3">
                  💡 Tip del día
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Prepara una agenda clara antes de cada sesión. Los estudiantes
                  valoran mentores organizados y preparados.
                </p>
              </div>
            </div>
          </div>

          {/* Estado vacío global */}
          {sessions.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ¡Bienvenido a tu calendario de mentorías!
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Aún no tienes sesiones programadas. Configura tu disponibilidad
                y comienza a ayudar estudiantes a crecer profesionalmente.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleNewSession}
                  className="bg-gradient-to-r from-theme-button-primary to-theme-button-secondary hover:opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
                >
                  Crear Primera Sesión
                </button>
                <button className="border border-theme-button-primary text-theme-button-primary hover:bg-theme-button-primary/5 px-8 py-3 rounded-full font-medium transition-all">
                  Configurar Disponibilidad
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCalendarPage;
