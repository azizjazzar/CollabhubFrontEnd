import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
      onClick={() => handleFunction(user)}
    >
      {/* Placeholder for avatar or initial - customize as needed */}
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
        {user.nom ? user.nom.charAt(0) : user.email ? user.email.charAt(0) : 'N/A'}
      </div>
      <div>
        <div className="text-sm font-medium text-gray-900">{user.email}</div>
        {/* Include more user details here if needed */}
      </div>
    </div>
  );
};

export default UserListItem;
