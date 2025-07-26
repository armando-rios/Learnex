import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  // Mapeo de rutas a breadcrumbs
  const routeMap: Record<string, { label: string; href?: string }[]> = {
    '/panel': [{ label: 'Inicio' }],
    '/perfil': [{ label: 'Inicio', href: '/panel' }, { label: 'Mi Perfil' }],
    '/configuracion': [
      { label: 'Inicio', href: '/panel' },
      { label: 'Configuración' },
    ],
    '/oportunidades': [
      { label: 'Inicio', href: '/panel' },
      { label: 'Oportunidades' },
    ],
  };

  // Obtener breadcrumb para la ruta actual
  const currentBreadcrumb = routeMap[location.pathname] || [
    { label: 'Inicio', href: '/panel' },
    { label: 'Página' },
  ];

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 font-Inter">
      {currentBreadcrumb.map((item, index) => {
        const isLast = index === currentBreadcrumb.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="hover:text-theme-button-primary cursor-pointer transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-gray-900 font-medium' : ''}>
                {item.label}
              </span>
            )}

            {!isLast && <ChevronRight className="w-4 h-4" />}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
