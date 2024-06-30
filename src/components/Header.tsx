import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { ROUTE_LOGIN, ROUTE_MAIN_PAGE, ROUTE_REGISTER } from '../utils/consts';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isAdmin, username } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTE_LOGIN);
  };

  return (
    <header className="relative bg-gray-800 p-4 inset-x-0 w-full h-18 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl pr-10 pointer">
          <NavLink to={ROUTE_MAIN_PAGE}>Cloud Storage</NavLink>
        </h1>
        <div className="absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {username && <div className={`text-white text-center bg-green-700 p-1 ${isAdmin ? 'rounded-l-lg' : 'rounded-lg mr-4'}`}>
            {username}
          </div>}
          {isAdmin && <div className="text-white mr-4 text-center rounded-r-lg bg-red-700 p-1">
            admin
          </div>}
        </div>
        {!isAuth ? (
          <div>
            <button
              onClick={() => navigate(ROUTE_LOGIN)}
              className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mr-2"
            >
              Log in
            </button>
            <button
              onClick={() => navigate(ROUTE_REGISTER)}
              className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
            >
              Sign up
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
