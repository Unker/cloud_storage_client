import UserList from "../components/UserList";

const AdminPage = (): JSX.Element => {
  return (
    <div className="flex h-screen flex-col">
      <UserList />
    </div>
  );
};

export default AdminPage;
