import React from 'react';
import {
  Calendar,
  Clock,
  Video,
  Play,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import type { SessionData } from '../hooks/useSessionsData';
import SessionStatusBadge from './SessionStatusBadge';

interface SessionCardProps {
  session: SessionData;
  variant?: 'timeline' | 'compact' | 'calendar';
  onAction?: (session: SessionData) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  variant = 'timeline',
  onAction,
}) => {
  // Iconos de estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
      case 'confirmed':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'live':
        return <Play className="w-5 h-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  // Botones de acción
  const getActionButton = (status: string) => {
    const handleAction = () => {
      if (onAction) {
        onAction(session);
      } else {
        alert(`Funcionalidad "${status}" próximamente disponible`);
      }
    };

    switch (status) {
      case 'upcoming':
      case 'confirmed':
        return (
          <button
            onClick={handleAction}
            className="bg-theme-button-primary hover:bg-theme-button-primary/90 text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            Unirse
          </button>
        );
      case 'live':
        return (
          <button
            onClick={handleAction}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 flex items-center gap-2 animate-pulse"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
            EN VIVO
          </button>
        );
      case 'completed':
        return (
          <button
            onClick={handleAction}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105"
          >
            Ver Grabación
          </button>
        );
      case 'pending':
        return (
          <button
            onClick={handleAction}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105"
          >
            Gestionar
          </button>
        );
      default:
        return null;
    }
  };

  // Render para vista timeline (estudiantes)
  if (variant === 'timeline') {
    return (
      <div className="relative flex items-start gap-6 pb-8">
        {/* Avatar en línea temporal */}
        <div className="relative z-10 flex-shrink-0">
          <div className="w-16 h-16 bg-white rounded-full border-4 border-theme-button-primary flex items-center justify-center text-2xl shadow-lg">
            {session.avatar}
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="mb-2">
                <SessionStatusBadge
                  status={session.status}
                  type={session.type}
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                {session.title}
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                con {session.mentor || session.student}
              </p>
              <p className="text-gray-500 text-sm mb-3">
                {session.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {session.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {session.time} • {session.duration}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getStatusIcon(session.status)}
              {getActionButton(session.status)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render para vista compacta
  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between hover:shadow-sm transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-lg">
            {session.avatar}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{session.title}</h4>
            <p className="text-sm text-gray-500">
              con {session.mentor || session.student} • {session.date}
            </p>
            <p className="text-xs text-gray-400 mt-1">{session.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-green-600 capitalize">
              {session.status === 'completed' ? 'Completada' : session.status}
            </div>
            <div className="text-xs text-gray-500">{session.duration}</div>
          </div>
          {getActionButton(session.status)}
        </div>
      </div>
    );
  }

  // Render para calendario (mentores)
  if (variant === 'calendar') {
    return (
      <div className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
              {session.avatar}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">
                {session.title}
              </h4>
              <p className="text-xs text-gray-500">con {session.student}</p>
            </div>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              session.status === 'confirmed'
                ? 'bg-green-500'
                : session.status === 'pending'
                  ? 'bg-yellow-500'
                  : 'bg-gray-500'
            }`}
            title={session.status}
          ></div>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {session.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {session.time}
          </span>
          <span>{session.duration}</span>
        </div>

        <button
          onClick={() => onAction && onAction(session)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
        >
          Gestionar
        </button>
      </div>
    );
  }

  return null;
};

export default SessionCard;
