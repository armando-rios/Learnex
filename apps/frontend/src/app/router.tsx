import { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import Header from '../shared/components/header/Header';
import Footer from '../shared/components/Footer';
import SideBar from '../shared/components/SideBar';
import Loading from '../shared/components/Loading';
import useAuthStore from '../features/auth/store/useAuthStore';
import { SidebarProvider } from '../shared/components/SidebarContext';

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
      getIsAuthenticated(); // Sin 'await'
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

// Layout compartido
const Layout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex flex-col h-screen relative z-40">
      <Header />
      <Suspense fallback={<Loading />}>
        <div className="flex-1 flex h-[calc(100vh-4.25rem-4rem)] md:h-[calc(100vh-4.5rem-5rem)]">
          {isAuthenticated && <SideBar />}
          <main className="max-h-full w-full">
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
              <Layout />
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
              <SidebarProvider>
                <Layout />
              </SidebarProvider>
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
