import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ROUTE_STORAGE } from "../utils/consts";

const AdminPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state: RootState) => state.auth);
  
  return (
    <>
      {isAdmin ? (
        <div className="w-full flex justify-end px-4">
          <button
            onClick={() => navigate(ROUTE_STORAGE)}
            className="w-48 text-white bg-indigo-600 hover:bg-indigo-700  px-4 py-2 rounded mr-2"
          >
            Open storage
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="flex h-screen flex-col">
        <UserList />
      </div>
    </>
  );
};

export default AdminPage;
