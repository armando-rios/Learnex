import { lazy, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import useAuthStore from '../features/auth/store/useAuthStore';
import Loading from '../shared/components/Loading';
import PublicLayout from '../shared/components/layouts/PublicLayout';
import PrivateLayout from '../shared/components/layouts/PrivateLayout';

// Lazy load de las páginas
const HomePage = lazy(() => import('../shared/pages/HomePage'));
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'));
const ProfilePage = lazy(
  () => import('../features/profiles/pages/ProfilePage')
);
const DashboardPage = lazy(
  () => import('../features/profiles/pages/DashboardPage')
);
const OpportunityPage = lazy(
  () => import('../features/opportunities/pages/OpportunityPage')
);
const SessionsPage = lazy(
  () => import('../features/sessions/pages/SessionsPage')
);
const NotFoundPage = lazy(() => import('../shared/pages/NotFoundPage'));

// Hook para inicializar autenticación
const useAuthInitialization = () => {
  const { isInitialized, getIsAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      getIsAuthenticated();
    }
  }, [isInitialized, getIsAuthenticated]);

  return isInitialized;
};

// Componente para manejar rutas públicas y privadas
const AuthRoute = ({
  children,
  isPrivate = false,
}: {
  children: React.ReactNode;
  isPrivate?: boolean;
}) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Redirigir a login si la ruta es privada y el usuario no está autenticado
  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirigir al dashboard si la ruta es pública y el usuario está autenticado
  const authPages = ['/iniciar-sesion', '/registrarse', '/'];
  if (!isPrivate && isAuthenticated && authPages.includes(location.pathname)) {
    return <Navigate to="/panel" replace />;
  }

  return <>{children}</>;
};

// Configuración de rutas principales
const AppRouter = () => {
  const isInitialized = useAuthInitialization();

  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
            <AuthRoute>
              <PublicLayout />
            </AuthRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/registrarse" element={<RegisterPage />} />
        </Route>

        {/* Rutas privadas */}
        <Route
          element={
            <AuthRoute isPrivate>
              <PrivateLayout />
            </AuthRoute>
          }
        >
          <Route path="/panel" index element={<DashboardPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/oportunidades" element={<OpportunityPage />} />
          <Route path="/sesiones" element={<SessionsPage />} />
        </Route>

        {/* Ruta no encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
