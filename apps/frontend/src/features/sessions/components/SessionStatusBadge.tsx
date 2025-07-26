// src/features/sessions/components/SessionStatusBadge.tsx
import React from 'react';

interface SessionStatusBadgeProps {
  status: string;
  type: string;
}

const SessionStatusBadge: React.FC<SessionStatusBadgeProps> = ({
  status,
  type,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
      case 'confirmed':
        return 'bg-theme-button-primary/10 text-theme-button-primary';
      case 'live':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    const typeMap = {
      mentoring: 'Mentoría',
      workshop: 'Taller',
      project: 'Proyecto',
      'project-review': 'Revisión',
      consultation: 'Consulta',
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  const getStatusLabel = (status: string) => {
    const statusMap = {
      upcoming: 'Próxima',
      confirmed: 'Confirmada',
      live: 'En Vivo',
      completed: 'Completada',
      pending: 'Pendiente',
      cancelled: 'Cancelada',
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="bg-theme-button-primary/10 text-theme-button-primary px-2 py-1 rounded-full text-xs font-medium">
        {getTypeLabel(type)}
      </span>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
      >
        {getStatusLabel(status)}
      </span>
    </div>
  );
};

export default SessionStatusBadge;
