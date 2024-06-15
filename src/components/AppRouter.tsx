import { Routes, Route } from 'react-router-dom';
import { IPublicRoute, adminRoutes, authRoutes, publicRoutes } from '../routes';
// import NotFoundPage from '../pages/NotFoundPage.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import MainPage from '../pages/MainPage.tsx';
import StoragePage from '../pages/StoragePage.tsx';
import AdminPage from '../pages/AdminPage.tsx';

const AppRouter = (): JSX.Element => {
  const { isAuth, isAdmin } = useSelector((state: RootState) => state.auth);

  return (
    <main className='container'>
      <Routes>
        {isAuth && authRoutes.map(({ path, component: Component }: IPublicRoute) =>
          <Route key={path} path={path} element={<Component />} />
        )}
        {isAdmin && adminRoutes.map(({ path, component: Component }: IPublicRoute) =>
          <Route key={path} path={path} element={<Component />} />
        )}
        {publicRoutes.map(({ path, component: Component }: IPublicRoute) =>
          <Route key={path} path={path} element={<Component />} />
        )}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="*" element={isAuth ? (isAdmin ? <AdminPage /> : <StoragePage />) : <MainPage />}  />
      </Routes>
    </main>
  )
};

export default AppRouter;
