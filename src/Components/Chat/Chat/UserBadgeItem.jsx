import React from 'react'

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div 
      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-full text-sm cursor-pointer flex items-center mr-2 mb-2"
      onClick={() => handleFunction(user)}
    >
      {user.nom}
      <span className="ml-2 text-xs">×</span>
    </div>
  );
};

export default UserBadgeItem;
