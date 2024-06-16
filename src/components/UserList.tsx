import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { IUser } from '../utils/types';
import { useGetUsersQuery } from '../api/api';
import { selectUser } from '../store/slices/userSlice';
import { RootState } from '../store/store';
import FileList from "../components/FileList";
import Paginator from './Paginator';



const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const offset = (currentPage - 1) * limit;

  const { data, error, isLoading } = useGetUsersQuery({ limit, offset });

  const handleSelectUser = (userId: number) => {
    dispatch(selectUser(userId));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <>
      <h2>Список пользователей</h2>
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
          {data?.results.map((user: IUser) => (
            <>
              <tr key={user.id} className={`bg-white ${user.id === selectedUserId ? 'bg-gray-300' : ''}`}>
                <td className="border border-gray-300 p-2">{user.id}</td>
                <td className="border border-gray-300 p-2">{user.username}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.first_name}</td>
                <td className="border border-gray-300 p-2">{user.last_name}</td>
                <td className="border border-gray-300 p-2">{user.is_active ? 'Да' : 'Нет'}</td>
                <td className="border border-gray-300 p-2">{user.is_staff ? 'Да' : 'Нет'}</td>
                <td className="border border-gray-300 p-2">{user.is_superuser ? 'Да' : 'Нет'}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleSelectUser(user.id)}
                    className={`px-2 py-1 text-sm rounded ${user.id === selectedUserId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    Файлы
                  </button>
                  <button
                    onClick={() => handleToggleAdmin(user)}
                    className={`px-2 py-1 text-sm rounded ${user.is_staff ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
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
              )}            </>
          ))}
        </tbody>
      </table>
      <Paginator
        currentPage={currentPage}
        totalPages={Math.ceil(data.count / limit)}
        onPageChange={setCurrentPage}
      />

    </>
  );
}

export default UserList;
