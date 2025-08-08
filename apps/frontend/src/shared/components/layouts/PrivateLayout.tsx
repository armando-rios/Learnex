import useAuthStore from '../../../features/auth/store/useAuthStore';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import { Suspense } from 'react';
import Loading from '../Loading';
import SideBar from '../SideBar';
import Footer from '../Footer';
import { SidebarProvider } from '../SidebarContext';

const PrivateLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <SidebarProvider>
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
    </SidebarProvider>
  );
};

export default PrivateLayout;
