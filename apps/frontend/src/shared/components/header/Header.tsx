import { useLocation } from 'react-router-dom';
import useAuthStore from '../../../features/auth/store/useAuthStore';
import PublicHeader from './PublicHeader';
import DashboardHeader from './DashboardHeader';
import AuthHeader from './AuthHeader';

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  // Rutas de autenticación
  const authRoutes = ['/iniciar-sesion', '/registrarse'];
  const isAuthRoute = authRoutes.includes(location.pathname);

  // Determinar qué header mostrar
  if (isAuthRoute) {
    return <AuthHeader />;
  }

  return isAuthenticated ? <DashboardHeader /> : <PublicHeader />;
};

export default Header;
