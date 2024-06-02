import { Link } from "react-router-dom";
import { ROUTE_LOGIN, ROUTE_REGISTER } from "../utils/consts";

const MainPage = (): JSX.Element => (
  <>
    Основная страница MainPage
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Cloud Storage</h1>
      <div>
        <Link to={ROUTE_LOGIN} className="text-blue-500">Register</Link> | 
        <Link to={ROUTE_REGISTER} className="text-blue-500"> Login</Link>
      </div>
    </div>
  </>
);

export default MainPage;
