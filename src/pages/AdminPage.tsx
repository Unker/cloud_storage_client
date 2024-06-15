import FileList from "../components/FileList";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const AdminPage = (): JSX.Element => {
  const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);

  return (
    <div className="flex h-screen">
      <Sidebar />
      {selectedUserId !== null ? (
        <div className="ml-64 w-full p-4 overflow-auto">
          <FileList userId={selectedUserId} />
        </div>
      ) : (
        <div className="ml-1/4 w-3/4 p-4 overflow-auto">
          <h2 className="text-2xl">Select a user to view files</h2>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
