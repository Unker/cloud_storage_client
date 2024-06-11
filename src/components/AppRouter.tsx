import { Routes, Route } from 'react-router-dom';
import { IPublicRoute, adminRoutes, authRoutes, publicRoutes } from '../routes';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';

const AppRouter = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <main className='container'>
      <Routes>
        {auth.isAuth && authRoutes.map(({ path, component: Component }: IPublicRoute) =>
          <Route key={path} path={path} element={<Component />} />
        )}
        {auth.isAuth && adminRoutes.map(({ path, component: Component }: IPublicRoute) =>
          <Route key={path} path={path} element={<Component />} />
        )}
        {publicRoutes.map(({ path, component: Component }: IPublicRoute) =>
          <Route key={path} path={path} element={<Component />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
};

export default AppRouter;
