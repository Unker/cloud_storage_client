import React from 'react';
import UserList from './UserList';


const Sidebar: React.FC = () => {

  return (
    <aside id="sidebar" className="fixed top-0 left-0 h-full w-1/4 min-w-[300px] bg-gray-200 mt-16 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-300 dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <UserList />
      </div>
    </aside>
  );
};

export default Sidebar;
