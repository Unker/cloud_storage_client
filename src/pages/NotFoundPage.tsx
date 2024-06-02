import { useNavigate } from 'react-router-dom';

import { ROUTE_MAIN_PAGE } from '../utils/consts';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="top-sales">
      <h1 className="text-center">Error 404. Page not found</h1>
      <div className="text-center">
        <p>
          Извините, такая страница не найдена!
        </p>
        <i
          onClick={() => navigate(ROUTE_MAIN_PAGE)}
          style={{ cursor: 'pointer' }}
        >
          Перейти на главную
        </i>
      </div>
    </section>
  );
};

export default NotFoundPage;
