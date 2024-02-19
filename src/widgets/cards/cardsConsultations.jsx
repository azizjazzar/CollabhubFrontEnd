import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/pages/authContext";
import axios from "axios";

export function CardsConsultations({ handleSearchInput }) {
  const [consultations, setConsultations] = useState([]);
  // Change to use a mapping of consultation IDs to user data
  const [users, setUsers] = useState({});
  const { authData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://colabhub.onrender.com/consultations/Consultations")
      .then(response => response.json())
      .then(data => {
        setConsultations(data);
        // Fetch user data for each consultation
        data.forEach(consultation => {
          if (consultation.freelancerId) {
            getUserById(consultation.freelancerId)
              .then(userData => {
                setUsers(prevUsers => ({
                  ...prevUsers,
                  [consultation.freelancerId]: userData
                }));
              })
              .catch(console.error);
          }
        });
      })
      .catch(error => console.error("Error fetching consultations:", error));
  }, []); // Removed authData.user from dependencies as it seems unrelated to fetching consultations

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`https://colabhub.onrender.com/api/auth/userid/${userId}`);
      if (response.data.success) {
        return response.data.info;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data. Please try again.');
    }
  };

  // Add missing handlers
  const handleConsultationClick = (id) => {
    // Your implementation here
  };

  const handleBookConsultationClick = (id) => {
    navigate(`/details-consultation/${id}`);
  };


  return (
    <main className="w-3/4 p-4 space-y-3">
      <div></div>

      <div className="mb-4 relative">
        <input
          type="search"
          placeholder="Search"
          className="w-full pl-4 pr-10 py-2 rounded-full text-black border border-gray-800 focus:outline-none"
          style={{ border: "1px solid #D0D3D4" }}
          onChange={handleSearchInput}
        />

        <button
          type="submit"
          className="absolute right-0 top-0 mt-2 mr-4"
        >
          <i className="fas fa-search text-gray-500"></i>
        </button>
      </div>

      {consultations.map(consultation => (
        <div
          key={consultation._id}
          className="bg-white rounded-lg shadow-md p-4 space-y-2 transition duration-300 ease-in-out hover:shadow-lg"
          tabIndex={0}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleConsultationClick(consultation._id);
            }
          }}
        >
          <div className="flex items-center">
            <img
              src="/img/user1.jpg"
              alt={`Profile of ${consultation.titre}`}
              className="rounded-full"
              style={{ width: "60px", height: "60px" }}
            />
<div className="flex-grow ml-2 pt-3">
  {/* nom user */}
  {users[consultation.freelancerId] && (
    <>
      {/* Utilisation de style inline pour le nom et le prénom */}
      <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '0.9rem', fontStyle: 'normal' ,color: '#808080' }}>
        {users[consultation.freelancerId].nom + " " + users[consultation.freelancerId].prenom}
      </span>
      {/* Ajout d'un point */}
      {"."}
      {/* Utilisation de style inline pour l'adresse avec une police fine et couleur grise */}
      <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'normal', fontSize: '0.8rem', fontStyle: 'italic', color: '#808080' }}>
        {users[consultation.freelancerId].adresse}
      </span>
      {/* Ajout d'un point après l'adresse */}
    
    </>
  )}
<h6 className="text-xl font-bold text-sm">{consultation.domaineExpertise}</h6>
  {/* domain user */}

</div>

            <button
              className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md focus:outline-none"
              type="button"
              onClick={() => handleBookConsultationClick(consultation._id)}
            >
              Book a Consultation
            </button>
          </div>
          <div className="flex items-center text-gray-500">
            <i className="fas fa-video mr-1"></i>
            {consultation.prixParMinute}$ per 30 minute
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="flex items-center text-orange-500">
              <i className="fas fa-star text-orange-400"></i> 4.9 ({consultation.reviews} reviews)
            </div>
          </div>
          <div className="mt-4 flex items-center">
  <p className="text-blue-500 border-b border-gray-200 text-sm pr-2">Meeting topics:</p>
      <div className="flex space-x-4">
              {consultation.titre && (
                <div className="border border-gray-300 text-gray-500 px-2 py-1 rounded-full text-xs">{consultation.titre}</div>
              )}
            </div>
      </div>

          <div className="text-gray-600 mb-1 text-sm">{consultation.description}</div>
        </div>
      ))}
    </main>
  );
}

export default CardsConsultations;
