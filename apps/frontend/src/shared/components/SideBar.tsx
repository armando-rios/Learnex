import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Search,
  Users,
  BookOpen,
  Calendar,
  MessageCircle,
  User,
  ChevronDown,
  Edit,
  Bell,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

import useAuthStore from '../../features/auth/store/useAuthStore';
import { ButtonLogout, ButtonProfileOption } from './Button';
import { useSidebar } from './SidebarContext';

const Sidebar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useSidebar();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const notifications = 2;
  const unreadMessages = 3;

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMobileMenuOpen(false);
        setIsCollapsed(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [setIsMobileMenuOpen]);

  const userName = user?.fullname;

  const menuItems = [
    {
      name: 'Inicio',
      icon: (
        <Home
          className={`${isCollapsed ? 'w-6 h-6' : 'w-[0.9375rem] h-[0.9375rem]'}`}
        />
      ),
      path: '/panel',
    },
    {
      name: 'Explorar',
      icon: (
        <Search
          className={`${isCollapsed ? 'w-6 h-6' : 'w-[0.9375rem] h-[0.9375rem]'}`}
        />
      ),
      path: '/oportunidades',
    },
    {
      name: 'Mentores',
      icon: (
        <Users
          className={`${isCollapsed ? 'w-6 h-6' : 'w-[0.9375rem] h-[0.9375rem]'}`}
        />
      ),
      path: '/conexiones',
    },
    {
      name: 'Mi Aprendizaje',
      icon: (
        <BookOpen
          className={`${isCollapsed ? 'w-6 h-6' : 'w-[0.9375rem] h-[0.9375rem]'}`}
        />
      ),
      path: '/aprendizaje',
    },
    {
      name: 'Mis Sesiones',
      icon: (
        <Calendar
          className={`${isCollapsed ? 'w-6 h-6' : 'w-[0.9375rem] h-[0.9375rem]'}`}
        />
      ),
      path: '/sesiones',
    },
    {
      name: 'Mensajes',
      icon: (
        <MessageCircle
          className={`${isCollapsed ? 'w-6 h-6' : 'w-[0.9375rem] h-[0.9375rem]'}`}
        />
      ),
      path: '/mensajes',
    },
  ];

  const handleEditProfile = () => {
    navigate('/perfil?edit=true'); // Navegar con parámetro para auto-abrir modal
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleGoToProfile = () => {
    navigate('/perfil');
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar - Ancho aumentado para acomodar iconos grandes */}
      <div
        className={`md:hidden fixed inset-0 ${isMobileMenuOpen && 'bg-black/80'} z-40`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <aside
        className={`
          max-md:fixed max-md:h-full max-md:top-0 transform bg-white flex flex-col transition-all duration-300 ease-in-out z-50 h-[calc(100vh-4.25rem-4rem)] lg:h-[calc(100vh-4.5rem-5rem)] ${isCollapsed ? 'w-20' : 'w-80'} ${isMobile && '-translate-x-full'} ${isMobileMenuOpen && 'translate-x-0'}`}
      >
        <div className="flex flex-col p-4 flex-1">
          {/* Header del sidebar con toggle mejorado */}
          <div className="mb-[1.5rem] mt-[1.5rem]">
            {!isCollapsed ? (
              <div className="flex items-center justify-between">
                <h1 className="text-[#5865F2] text-[1.3rem] font-bold flex-1 text-center">
                  Bienvenido {userName}
                </h1>
                {/* Toggle button mejorado - solo en desktop */}
                <button
                  onClick={() => {
                    setIsCollapsed(!isCollapsed);
                  }}
                  className="max-md:hidden p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 ml-2 border border-blue-200 hover:border-blue-300"
                  title="Contraer sidebar"
                >
                  <PanelLeftClose className="w-5 h-5 text-[#5865F2] hover:text-[#4F46E5]" />
                </button>
              </div>
            ) : (
              // Solo toggle cuando está colapsado - mejorado
              <div className="flex justify-center">
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2.5 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
                  title="Expandir sidebar"
                >
                  <PanelLeftOpen className="w-5 h-5 text-[#5865F2] hover:text-[#4F46E5]" />
                </button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 flex-1">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={handleMenuItemClick}
                className="w-full flex items-center gap-[0.5rem] p-3 bg-transparent border-[0.025rem] border-[#E5E7EB] text-left text-gray-700 hover:bg-[#F3F4F6] text-[0.9375rem] font-bold rounded mx-auto transition-all duration-200"
              >
                {item.icon}
                {!isCollapsed && (
                  <>
                    <span>{item.name}</span>
                    {item.name === 'Mensajes' && unreadMessages > 0 && (
                      <span className="ml-auto bg-[#6B7280] text-[#FFFFFF] text-[0.625rem] font-bold rounded-full w-[1.25rem] h-[1.25rem] flex items-center justify-center">
                        {unreadMessages}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Profile Menu */}
            <div>
              <button
                onClick={() => {
                  if (isCollapsed) {
                    // Si está colapsado, ir directamente al perfil
                    handleGoToProfile();
                  } else {
                    // Si no está colapsado, mostrar/ocultar dropdown
                    setShowProfileMenu(!showProfileMenu);
                  }
                }}
                className="flex w-full items-center gap-[0.5rem] p-3 bg-transparent border-[0.025rem] border-[#E5E7EB] text-left text-gray-700 hover:bg-[#F3F4F6] text-[0.9375rem] font-bold rounded mx-auto transition-all duration-200"
              >
                <User
                  className={`${isCollapsed ? 'w-6 h-6' : 'w-[0.9375rem] h-[0.9375rem]'} rounded-full border border-[#000000]`}
                />
                {!isCollapsed && (
                  <>
                    <span>Mi Perfil</span>
                    <ChevronDown
                      className={`ml-auto w-[0.9375rem] h-[0.9375rem] transition-transform ${
                        showProfileMenu ? 'rotate-180' : ''
                      }`}
                    />
                  </>
                )}
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && !isCollapsed && (
                <div className="mt-2 bg-gray-50 rounded shadow-md p-[0.5rem] w-[12rem] mx-auto">
                  <ButtonProfileOption
                    title="Cuenta"
                    onClick={handleGoToProfile}
                    styles="flex items-center gap-[0.375rem]"
                    icon={<Edit className="w-[0.9375rem] h-[0.9375rem]" />}
                  />
                  <ButtonProfileOption
                    title="Editar Perfil"
                    onClick={handleEditProfile}
                    styles="flex items-center gap-[0.375rem]"
                    icon={<Settings className="w-[0.9375rem] h-[0.9375rem]" />}
                  />
                  <ButtonProfileOption
                    title={`Notificaciones (${notifications})`}
                    onClick={() => {
                      console.log('Notificaciones');
                      setShowProfileMenu(false);
                      setIsMobileMenuOpen(false);
                    }}
                    styles="flex items-center gap-[0.375rem]"
                    icon={<Bell className="w-[0.9375rem] h-[0.9375rem]" />}
                  />
                </div>
              )}
            </div>
          </nav>

          {/* Logout Button - Ahora dentro del flex container para mejor distribución */}
          <div className="mt-4">
            {!isCollapsed ? (
              <ButtonLogout
                title="Salir"
                onClick={logout}
                icon={<LogOut className="w-[0.9375rem] h-[0.9375rem]" />}
              />
            ) : (
              <button
                onClick={logout}
                className="p-2 hover:bg-red-50 rounded transition-colors flex items-center justify-center w-full border border-red-200 hover:border-red-300"
                title="Salir"
              >
                <LogOut className="w-4 h-4 text-red-500 hover:text-red-600" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
