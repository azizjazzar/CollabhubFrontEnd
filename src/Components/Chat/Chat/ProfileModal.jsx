// ProfileModal.js
import React from "react";

const ProfileModal = ({ user }) => {
  return (
    <div className="profile-modal">
  
        <div className="text-center mt-2">
          <h3 className="text-lg font-semibold">{user.nom}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
    </div>
  );
};

export default ProfileModal;
