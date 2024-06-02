import UserList from "../components/UserList";

const AdminPage = (): JSX.Element => (
  <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Interface</h1>
      <UserList />
    </div>  </>
);

export default AdminPage;
