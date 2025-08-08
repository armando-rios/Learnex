import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../header/Header';
import Loading from '../Loading';

const PublicLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Suspense fallback={<Loading />}>
        <div className="flex-1">
          <main className="h-full">
            <Outlet />
          </main>
        </div>
      </Suspense>
      <Footer />
    </div>
  );
};

export default PublicLayout;
