import { useNavigate } from 'react-router-dom';
import { Bell, Settings, User, ChevronDown } from 'lucide-react';
import useAuthStore from '../../../features/auth/store/useAuthStore';
import { useState } from 'react';

interface DashboardHeaderProps {
  onEditProfile?: () => void;
}

const DashboardHeader = ({ onEditProfile }: DashboardHeaderProps) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogoClick = () => {
    // Para usuarios autenticados, ir al panel en lugar del inicio público
    navigate('/panel');
  };

  return (
    <header className="bg-gradient-to-r from-theme-button-primary to-theme-button-secondary shadow-lg backdrop-blur-sm z-50 relative">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo clickeable que va al PANEL */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
          >
            <img
              src="/logos/skilllink-logo-light.svg"
              alt="SkillLink Logo"
              className="h-12 lg:h-18 w-auto"
            />
          </button>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
              <Bell className="w-5 h-5" />
            </button>

            {/* Settings */}
            <button
              onClick={onEditProfile}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user?.name || 'Usuario'}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu - con z-index muy alto y posicionamiento mejorado */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] transform opacity-100 visible translate-y-0">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate('/perfil');
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Mi Perfil
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate('/configuracion');
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Configuración
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar dropdown al hacer click fuera */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default DashboardHeader;
