import { Link, useNavigate } from "react-router-dom";
import { ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_STORAGE } from "../utils/consts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

const MainPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (isAuth) {
      navigate(ROUTE_STORAGE);
    }
  }, [isAuth, navigate]);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to Cloud Storage</h1>

        <div>
          <Link to={ROUTE_LOGIN} className="text-blue-500">Login</Link> |
          <Link to={ROUTE_REGISTER} className="text-blue-500"> Register</Link>
        </div>
      </div>
    </>
  );
};

export default MainPage;
