import { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Header from '../shared/components/header/Header';
import Footer from '../shared/components/Footer';
import SideBar from '../shared/components/SideBar';
import Loading from '../shared/components/Loading';
import useAuthStore from '../features/auth/store/useAuthStore';
import DashboardPage from '../features/profiles/pages/DashboardPage';
import OpportunityPage from '../features/opportunities/pages/OpportunityPage';
import SessionsPage from '../features/sessions/pages/SessionsPage';

// Lazy load de las páginas
const HomePage = lazy(() => import('../shared/pages/HomePage'));
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'));
const ProfilePage = lazy(
  () => import('../features/profiles/pages/ProfilePage')
);
const NotFoundPage = lazy(() => import('../shared/pages/NotFoundPage'));

// Componente para rutas privadas
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized, getIsAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      getIsAuthenticated();
    }
  }, [isInitialized, getIsAuthenticated]);

  // Mostrar loading mientras inicializa
  if (!isInitialized) {
    return <Loading />;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Componente para rutas públicas (solo redirige si estamos en páginas específicas de auth)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized, getIsAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      getIsAuthenticated();
    }
  }, [isInitialized, getIsAuthenticated]);

  // Mostrar loading mientras inicializa
  if (!isInitialized) {
    return <Loading />;
  }

  // Solo redirigir al panel si estamos en las páginas de login o registro
  // y el usuario ya está autenticado
  const currentPath = window.location.pathname;
  const authPages = ['/iniciar-sesion', '/registrarse'];

  if (isAuthenticated && authPages.includes(currentPath)) {
    return <Navigate to="/panel" replace />;
  }

  return children;
};

const Layout = () => {
  const { isAuthenticated, isInitialized, getIsAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      getIsAuthenticated();
    }
  }, [isInitialized, getIsAuthenticated]);

  return (
    <div className="flex flex-col h-screen relative z-40">
      <Header />
      <Suspense fallback={<Loading />}>
        <div className="flex-1 flex h-[calc(100vh-4.25rem-4rem)] md:h-[calc(100vh-4.5rem-5rem)]">
          {isAuthenticated && <SideBar />}
          <main className="max-h-full w-full">
            {/* paginas privadas */}
            <Outlet />
          </main>
        </div>
      </Suspense>
      <Footer />
    </div>
  );
};

// Configuración de rutas principales
const AppRouter = () => {
  const { isInitialized, getIsAuthenticated } = useAuthStore();

  // Inicializar el estado de autenticación al cargar la app
  useEffect(() => {
    if (!isInitialized) {
      getIsAuthenticated();
    }
  }, [isInitialized, getIsAuthenticated]);

  // Mostrar loading mientras inicializa la app
  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Layout />
            </PublicRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/registrarse" element={<RegisterPage />} />
        </Route>
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/panel" element={<DashboardPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/oportunidades" element={<OpportunityPage />} />
          <Route path="/sesiones" element={<SessionsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
