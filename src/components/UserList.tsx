import React, { useState } from 'react';
import { IUser } from '../utils/types';
import Paginator from './Paginator';
import { useGetUsersQuery } from '../api/api';
import { selectUser } from '../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';


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
      <ul>
        {data?.results.map((user: IUser) => (
          <li key={user.id} className={`mb-2 ${user.id === selectedUserId ? 'bg-gray-300' : ''}`}>
            <button
              onClick={() => handleSelectUser(user.id)}
              className={`text-left w-full p-2 rounded ${user.id === selectedUserId ? 'font-bold' : ''} hover:bg-gray-300`}
            >
              {user.username}
            </button>
          </li>
        ))}
      </ul>
      {data && <Paginator
        currentPage={currentPage}
        totalPages={Math.ceil(data.count / limit)}
        onPageChange={setCurrentPage}
      />}
    </>
  )
}

export default UserList;
