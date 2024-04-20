import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/pages/authContext";
import axios from "axios";
import Autosuggest from 'react-autosuggest';
import AuthenticationService from "@/Services/Authentification/AuthentificationService";

function CardsConsultations({ handleSearchInput }) {
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [users, setUsers] = useState({});
  const { authData } = useAuth();
  const navigate = useNavigate();
  const authenticationService = new AuthenticationService();
  const [value, setValue] = useState(''); // État pour la valeur de l'autocomplétion
  const CheckProfile = (e, consultation) => {
    e.preventDefault();
    navigate(`/profile/${consultation.freelancerId}`);
  }
  

  useEffect(() => {
    fetch("https://colabhub.onrender.com/consultations/Consultations")
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("consultations", JSON.stringify(data));
        setConsultations(data);
        setFilteredConsultations(data);
        data.forEach(consultation => {
          if (consultation.freelancerId) {
            authenticationService.getUserById(consultation.freelancerId)
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
  }, []);

 

  const handleBookConsultationClick = (id) => {
    navigate(`/details-consultation/${id}`);
  };

  const getSuggestions = (value) => {
    if (!value) return []; 
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const filtered = consultations.filter(consultation =>
      consultation.domaineExpertise.toLowerCase().includes(inputValue)
    );
    return inputLength === 0 || filtered.length === 0 ? [] : filtered;
  };
  
  
  

  const renderSuggestion = (suggestion) => (
    <div style={{ backgroundColor: "#F8F9F9", textAlign: "left", color: "#A6ACAF", fontSize: "14px", transform: "skewX(-10deg)", paddingLeft: "15px" }}>
      {suggestion}
    </div>
  );
  
  
  const handleSuggestionSelected = (event, { suggestion }) => {
    const filtered = consultations.filter(consultation =>
      consultation.domaineExpertise.toLowerCase().includes(suggestion.toLowerCase())
    );
    setFilteredConsultations(filtered);
  };

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
    if (newValue === "") {
      setFilteredConsultations(consultations);
    } else {
      handleSuggestionSelected(event, { suggestion: newValue });
    }
  };

  return (
    <main className="w-3/4 p-4 space-y-3">
      <div className="mb-4 relative">
        <Autosuggest
          suggestions={getSuggestions(value).map(consultation => consultation.domaineExpertise)}
          onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={() => {}}
          getSuggestionValue={suggestion => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Search',
            className: "w-full pl-4 pr-10 py-2 rounded-full text-black border border-gray-800 focus:outline-none",
            style: { border: "1px solid #D0D3D4" },
            value: value,
            onChange: handleInputChange
          }}
          onSuggestionSelected={handleSuggestionSelected}
        />

        <button
          type="submit"
          className="absolute right-0 top-0 mt-2 mr-4"
        >
          <i className="fas fa-search text-gray-500"></i>
        </button>
      </div>

      {filteredConsultations.map(consultation => (
        <div
          key={consultation._id}
          className="bg-white rounded-lg shadow-md p-4 space-y-2 transition duration-300 ease-in-out hover:shadow-lg"
          tabIndex={0}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleBookConsultationClick(consultation._id);
            }
          }}
        >
          <div className="flex items-center">
          {users[consultation.freelancerId] && (
              <div>
               <img
                  src={`https://colabhub.onrender.com/images/${users[consultation.freelancerId].picture}`}
                  onClick={(e) => CheckProfile(e, consultation)}
                  alt={`Profile of ${consultation.titre}`}
                  className="rounded-full"
                  style={{ width: "60px", height: "60px" }}
                />

                
              </div>
            )}

            <div className="flex-grow ml-2 pt-3">
              {users[consultation.freelancerId] && (
                <>
                  <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '0.9rem', fontStyle: 'normal', color: '#808080' }}>
                    {users[consultation.freelancerId].nom + " " + users[consultation.freelancerId].prenom}
                  </span>
                  {"."}
                  <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'normal', fontSize: '0.8rem', fontStyle: 'italic', color: '#808080' }}>
                    {users[consultation.freelancerId].adresse}
                  </span>
                </>
              )}
              <h6 className="text-xl font-bold text-sm">{consultation.domaineExpertise}</h6>
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
    <i className="fas fa-star text-orange-400"></i>
    {" "}
    {users[consultation.freelancerId] && (users[consultation.freelancerId].rate || 0)}
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

export { CardsConsultations };
