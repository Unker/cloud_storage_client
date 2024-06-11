import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl pr-10">Cloud Storage</h1>
        <div>
          {!isAuth ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mr-2"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate('/register')}
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
