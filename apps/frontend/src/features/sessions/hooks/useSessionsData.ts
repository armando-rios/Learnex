import { useMemo } from 'react';
import useAuthStore from '../../auth/store/useAuthStore';

export interface SessionData {
  id: number;
  title: string;
  mentor?: string;
  student?: string;
  avatar: string;
  date: string;
  time: string;
  duration: string;
  status:
    | 'upcoming'
    | 'live'
    | 'completed'
    | 'confirmed'
    | 'pending'
    | 'cancelled';
  type:
    | 'mentoring'
    | 'workshop'
    | 'project'
    | 'project-review'
    | 'consultation';
  description: string;
}

export const useSessionsData = () => {
  const { user } = useAuthStore();
  const isStudent = user?.role === 'ROLE_USER';
  const isMentor = user?.role === 'ROLE_MENTOR';

  // Mock data para estudiantes
  const MOCK_STUDENT_SESSIONS: SessionData[] = [
    {
      id: 1,
      title: 'Introducción a React',
      mentor: 'Pedro Gómez',
      avatar: '👨‍💻',
      date: '2025-06-30',
      time: '10:00 AM',
      duration: '1h',
      status: 'upcoming',
      type: 'mentoring',
      description:
        'Aprende los fundamentos de React y componentes reutilizables',
    },
    {
      id: 2,
      title: 'JavaScript Avanzado',
      mentor: 'Ana García',
      avatar: '👩‍💻',
      date: '2025-07-01',
      time: '2:00 PM',
      duration: '1.5h',
      status: 'upcoming',
      type: 'workshop',
      description: 'Conceptos avanzados de JavaScript y ES6+',
    },
    {
      id: 3,
      title: 'Fundamentos HTML/CSS',
      mentor: 'Luis Arce',
      avatar: '👨‍🎓',
      date: '2025-06-25',
      time: '11:00 AM',
      duration: '45min',
      status: 'completed',
      type: 'mentoring',
      description: 'Bases del desarrollo web frontend',
    },
    {
      id: 4,
      title: 'Node.js Backend',
      mentor: 'María López',
      avatar: '👩‍🔬',
      date: '2025-06-22',
      time: '4:00 PM',
      duration: '2h',
      status: 'completed',
      type: 'project',
      description: 'Desarrollo de APIs con Node.js y Express',
    },
  ];

  // Mock data para mentores
  const MOCK_MENTOR_SESSIONS: SessionData[] = [
    {
      id: 1,
      title: 'Introducción a React',
      student: 'Ana García',
      avatar: '🎓',
      date: '2025-06-28',
      time: '10:00',
      duration: '1h',
      status: 'confirmed',
      type: 'mentoring',
      description: 'Fundamentos de React con estudiante principiante',
    },
    {
      id: 2,
      title: 'Revisión Proyecto E-commerce',
      student: 'Carlos López',
      avatar: '👨‍💻',
      date: '2025-06-28',
      time: '15:30',
      duration: '45min',
      status: 'pending',
      type: 'project-review',
      description: 'Revisión del progreso del proyecto de tienda online',
    },
    {
      id: 3,
      title: 'JavaScript Avanzado',
      student: 'María Rodríguez',
      avatar: '👩‍🎓',
      date: '2025-06-29',
      time: '11:00',
      duration: '1.5h',
      status: 'confirmed',
      type: 'workshop',
      description: 'Conceptos avanzados y patrones de diseño',
    },
    {
      id: 4,
      title: 'Consulta CSS Grid',
      student: 'Pedro Morales',
      avatar: '🧑‍💻',
      date: '2025-06-30',
      time: '14:00',
      duration: '30min',
      status: 'confirmed',
      type: 'consultation',
      description: 'Ayuda con layouts CSS Grid y Flexbox',
    },
    {
      id: 5,
      title: 'Mentoría de Carrera',
      student: 'Sofia Herrera',
      avatar: '👩‍💼',
      date: '2025-07-01',
      time: '16:00',
      duration: '1h',
      status: 'confirmed',
      type: 'mentoring',
      description: 'Orientación profesional y plan de carrera',
    },
  ];

  // Seleccionar data según el rol
  const sessions = useMemo(() => {
    return isStudent ? MOCK_STUDENT_SESSIONS : MOCK_MENTOR_SESSIONS;
  }, [isStudent]);

  // Computed values
  const upcomingSessions = sessions.filter(
    (s) => s.status === 'upcoming' || s.status === 'confirmed'
  );
  const completedSessions = sessions.filter((s) => s.status === 'completed');
  const pendingSessions = sessions.filter((s) => s.status === 'pending');

  // Calendar helpers
  const getSessionsForDate = (date: string) => {
    return sessions.filter((session) => session.date === date);
  };

  // Stats calculadas
  const stats = useMemo(() => {
    const totalHours = sessions.reduce((acc, session) => {
      const hours = parseFloat(session.duration.replace(/[^\d.]/g, ''));
      return acc + (isNaN(hours) ? 0 : hours);
    }, 0);

    if (isStudent) {
      return {
        total: sessions.length,
        upcoming: upcomingSessions.length,
        completed: completedSessions.length,
        totalHours,
      };
    } else {
      return {
        total: sessions.length,
        confirmed: sessions.filter((s) => s.status === 'confirmed').length,
        pending: pendingSessions.length,
        totalHours,
      };
    }
  }, [
    sessions,
    isStudent,
    upcomingSessions.length,
    completedSessions.length,
    pendingSessions.length,
  ]);

  return {
    sessions,
    upcomingSessions,
    completedSessions,
    pendingSessions,
    getSessionsForDate,
    stats,
    isStudent,
    isMentor,
  };
};
