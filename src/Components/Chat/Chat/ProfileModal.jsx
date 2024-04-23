// ProfileModal.js
import React from "react";

const ProfileModal = ({ user }) => {
  return (
    <div className="profile-modal">
      <img src={user.picture} alt="Profile" className="profile-picture" />
      <div className="profile-details">
        <h3>{user.nom}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileModal;
