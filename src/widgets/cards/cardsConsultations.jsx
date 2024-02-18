import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CardsConsultations({ handleSearchInput }) {
  const [consultations, setConsultations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/consultations/Consultations")
      .then(response => response.json())
      .then(data => setConsultations(data))
      .catch(error => console.error("Error fetching consultations:", error));
  }, []);

  const handleConsultationClick = (id) => {
    // Ne rien faire ici pour éviter la redirection lors du clic sur la carte
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
            <div className="flex-grow ml-2">
                 {/* nom user */}
              <h3 className="text-xl font-bold">{consultation.titre}</h3>
                {/* domain user */}
              <div className="text-gray-600 mb-1 text-sm">{consultation.titre}</div>
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
              {consultation.topics && consultation.topics.map((topic, index) => (
                <div key={index} className="border border-gray-300 text-gray-500 px-2 py-1 rounded-full text-xs">{topic}</div>
              ))}
            </div>
          </div>
          <div className="text-gray-600 mb-1 text-sm">{consultation.description}</div>
        </div>
      ))}
    </main>
  );
}

export default CardsConsultations;
