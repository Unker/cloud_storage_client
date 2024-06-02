import React, { useEffect, useState } from 'react';
import { ROUTE_API_USERS } from '../utils/consts';
import { IUser, IUsers } from '../utils/types';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const fetchUsers = (url: string) => {
    fetch(url)
      .then(response => response.json())
      .then((data: IUsers) => {
        setUsers(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      });
  };

  useEffect(() => {
    fetchUsers(ROUTE_API_USERS);
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.first_name} - {user.email}</li>
        ))}
      </ul>
      <div className="mt-4">
        {prevPage && <button onClick={() => fetchUsers(prevPage)} className="mr-2 bg-gray-300 px-4 py-2">Previous</button>}
        {nextPage && <button onClick={() => fetchUsers(nextPage)} className="bg-gray-300 px-4 py-2">Next</button>}
      </div>
    </div>
  );
};

export default UserList;