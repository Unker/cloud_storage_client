import { Routes, Route } from 'react-router-dom';
import publicRoutes, { IPublicRoute } from '../routes';
import NotFoundPage from '../pages/NotFoundPage.tsx';

const AppRouter = (): JSX.Element => (
  <main className='container'>
    <Routes>
      {publicRoutes.map(({ path, component: Component }: IPublicRoute) => (
        <Route key={path} path={path} element={<Component />} />
      ))
      }
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </main>
);

export default AppRouter;
