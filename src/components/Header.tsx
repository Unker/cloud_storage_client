import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { ROUTE_LOGIN, ROUTE_REGISTER } from '../utils/consts';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTE_LOGIN);
  };

  return (
    <header className="bg-gray-800 p-4 fixed inset-x-0 top-0 h-16 overflow-auto z-50">
    {/* <header className="fixed flex p-4 items-center justify-between bg-gray-800 py-2 shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"> */}
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl pr-10">Cloud Storage</h1>
        <div>
          {!isAuth ? (
            <>
              <button
                onClick={() => navigate(ROUTE_LOGIN)}
                className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mr-2"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate(ROUTE_REGISTER)}
                className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
              >
                Sign up
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
