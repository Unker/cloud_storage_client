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
  const [userToDelete, setUserToDelete] = useState<number | undefined>(undefined);
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

  const handleDeleteUser = async (userId: number) => {
    setShowDeleteModal(true);
    setUserToDelete(userId);

  };

  const confirmDelete = async () => {
    if (userToDelete !== undefined) {
      try {
        await deleteUser(userToDelete).unwrap();
        toast.success(`User with ID ${userToDelete} deleted successfully.`);
        refetchUsers();
      } catch (error) {
        toast.error(`Failed to delete user with ID ${userToDelete}: ${error}`);
      }
      setShowDeleteModal(false);
      setUserToDelete(undefined);
    }
  };

  const cancelDelete = async () => {
    setShowDeleteModal(false);
    setUserToDelete(undefined);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  const sortedUsers = users?.results.slice().sort((a: IUser, b: IUser) => a.id - b.id);

  return (
    <>
      <h2 className='text-xl mb-2'>Список пользователей</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Имя пользователя</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Имя</th>
            <th className="border border-gray-300 p-2">Фамилия</th>
            <th className="border border-gray-300 p-2">Активен</th>
            <th className="border border-gray-300 p-2">Администратор</th>
            <th className="border border-gray-300 p-2">Суперпользователь</th>
            <th className="border border-gray-300 p-2">Действия</th>
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
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleSelectUser(user.id)}
                    className={`px-2 py-1 my-1 text-sm rounded ${user.id === selectedUserId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    Файлы
                  </button>
                  <button
                    onClick={() => handleToggleAdmin(user)}
                    className={`px-2 py-1 my-1 text-sm rounded ${user.is_staff ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    {user.is_staff ? 'Убрать админа' : 'Сделать админом'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
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
      />

    </>
  );
}

export default UserList;
