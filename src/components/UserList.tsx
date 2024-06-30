import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IUser } from '../utils/types';
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../api/api';
import { selectUser } from '../store/slices/userSlice';
import { RootState } from '../store/store';
import FileList from "../components/FileList";
import Paginator from './Paginator';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';
import { toast } from 'react-toastify';


const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | undefined>(undefined);
  const [userNameToDelete, setUserNameToDelete] = useState<string | undefined>('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const offset = (currentPage - 1) * limit;

  const {
    data: users = undefined,
    error,
    isLoading,
    refetch: refetchUsers,
  } = useGetUsersQuery({ limit, offset });

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleSelectUser = (userId: number | null) => {
    if (selectedUserId === userId) {
      userId = null;
    }
    dispatch(selectUser(userId));
  };

  const handleToggleAdmin = async (user: IUser) => {
    try {
      const isAdmin = {
        userId: user.id,
        is_staff: !user.is_staff
      };
      await updateUser(isAdmin).unwrap();
      toast.success(`User with ID ${user.id} updated successfully.`);
      refetchUsers();
    } catch (error) {
      toast.error(`Failed to update user with ID ${user.id}: ${error}`);
    }
  };

  const handleDeleteUser = async (user: IUser) => {
    setShowDeleteModal(true);
    setUserIdToDelete(user.id);
    setUserNameToDelete(user.username);

  };

  const confirmDelete = async () => {
    if (userIdToDelete !== undefined) {
      try {
        await deleteUser(userIdToDelete).unwrap();
        toast.success(`User with ID ${userIdToDelete} deleted successfully.`);
        refetchUsers();
      } catch (error) {
        toast.error(`Failed to delete user with ID ${userIdToDelete}: ${error}`);
      }
      setShowDeleteModal(false);
      setUserIdToDelete(undefined);
      setUserNameToDelete('');
    }
  };

  const cancelDelete = async () => {
    setShowDeleteModal(false);
    setUserIdToDelete(undefined);
    setUserNameToDelete('');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  const sortedUsers = users?.results.slice().sort((a: IUser, b: IUser) => a.id - b.id);

  return (
    <>
      <h2 className='text-xl mb-2'>Users list</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">First name</th>
            <th className="border border-gray-300 p-2">Last name</th>
            <th className="border border-gray-300 p-2">Active</th>
            <th className="border border-gray-300 p-2">Admin</th>
            <th className="border border-gray-300 p-2">Superuser</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers?.map((user: IUser) => (
            <React.Fragment key={user.id}>
              <tr className={`hover:bg-gray-100 ${user.id === selectedUserId ? 'bg-gray-200' : ''}`}>
                <td className="border border-gray-300 p-2">{user.id}</td>
                <td className="border border-gray-300 p-2">{user.username}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.first_name}</td>
                <td className="border border-gray-300 p-2">{user.last_name}</td>
                <td className={`border border-gray-300 text-center text-xl ${user.is_active ? 'text-green-700' : 'text-red-400'}`}>
                  {user.is_active ? <FaCheckCircle className="mx-auto" /> : <FaTimesCircle className="mx-auto" />}
                </td>
                <td className={`border border-gray-300 text-center text-xl ${user.is_staff ? 'text-green-700' : 'text-red-400'}`}>
                  {user.is_staff ? <FaCheckCircle className="mx-auto" /> : <FaTimesCircle className="mx-auto" />}
                </td>
                <td className={`border border-gray-300 text-center text-xl ${user.is_superuser ? 'text-green-700' : 'text-red-400'}`}>
                  {user.is_superuser ? <FaCheckCircle className="mx-auto" /> : <FaTimesCircle className="mx-auto" />}
                </td>
                <td className="border border-gray-300 p-2 space-x-2 text-left">
                  <button
                    onClick={() => handleSelectUser(user.id)}
                    className={`w-24 px-2 py-1 my-1 text-sm rounded ${user.id === selectedUserId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    {user.id === selectedUserId ? 'Hide files' : 'Show files'}
                  </button>
                  <button
                    onClick={() => handleToggleAdmin(user)}
                    className={`w-32 px-2 py-1 my-1 text-sm rounded ${user.is_staff ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    {user.is_staff ? 'Remove admin' : 'Make admin'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="px-2 py-1 text-sm text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
              {user.id === selectedUserId && (
                <tr>
                  <td colSpan={9} className="border border-gray-300 p-2">
                    <FileList userId={selectedUserId} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {users && <Paginator
        currentPage={currentPage}
        totalPages={Math.ceil(users.count / limit)}
        onPageChange={setCurrentPage}
      />}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete user"
        message={`Are you sure you want to delete user ${userNameToDelete}? This action cannot be undone.`}
      />

    </>
  );
}

export default UserList;
