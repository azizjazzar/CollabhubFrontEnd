import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "@/Services/Authentification/AuthentificationService";
import Autosuggest from 'react-autosuggest';

function CardsConsultations({ handleSearchInput, consultationsPerPage, currentPage, consultations }) {
  const [users, setUsers] = useState({});
  const [value, setValue] = useState('');
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const navigate = useNavigate();
  const authenticationService = new AuthenticationService();

  useEffect(() => {
    const fetchData = async () => {
      consultations.forEach(consultation => {
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
    };

    fetchData();
  }, [consultations]);

  const handleBookConsultationClick = (id) => {
    navigate(`/details-consultation/${id}`);
  };

  const renderSuggestion = (suggestion) => (
    <div style={{ backgroundColor: "#F8F9F9", textAlign: "left", color: "#A6ACAF", fontSize: "14px", transform: "skewX(-10deg)", paddingLeft: "15px" }}>
      {suggestion}
    </div>
  );

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
    if (newValue === "") {
      setFilteredConsultations(consultations);
    } else {
      handleSuggestionSelected(event, { suggestion: newValue });
    }
  };

  const handleSuggestionSelected = (event, { suggestion }) => {
    const filtered = consultations.filter(consultation =>
      consultation.domaineExpertise.toLowerCase().includes(suggestion.toLowerCase())
    );
    setFilteredConsultations(filtered);
  };

  const CheckProfile = (e, consultation) => {
    e.preventDefault();
    navigate(`/profile/${consultation.freelancerId}`);
  };

  const getSuggestions = (value) => {
    if (!value) return [];
    const inputValue = value.trim().toLowerCase();
    const uniqueSuggestions = [...new Set(consultations.map(consultation => consultation.domaineExpertise))];
    return uniqueSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue)
    );
  };

  const autosuggestProps = {
    suggestions: getSuggestions(value),
    onSuggestionsFetchRequested: () => {},
    onSuggestionsClearRequested: () => {},
    getSuggestionValue: suggestion => suggestion,
    renderSuggestion: renderSuggestion,
    inputProps: {
      placeholder: 'Search',
      className: "w-full pl-4 pr-10 py-2 rounded-full text-black border border-gray-800 focus:outline-none",
      style: { border: "1px solid #D0D3D4" },
      value: value,
      onChange: handleInputChange
    },
    onSuggestionSelected: handleSuggestionSelected
  };

  // Pagination
  const indexOfLastConsultation = currentPage * consultationsPerPage;
  const indexOfFirstConsultation = indexOfLastConsultation - consultationsPerPage;
  const currentConsultations = filteredConsultations.length ? filteredConsultations.slice(indexOfFirstConsultation, indexOfLastConsultation) : consultations.slice(indexOfFirstConsultation, indexOfLastConsultation);

  return (
    <main className="w-3/4 p-4 space-y-3">
      <Autosuggest {...autosuggestProps} />
      {currentConsultations.map(consultation => (
        <div className="mb-4 relative" key={consultation._id}>
          <div className="bg-white rounded-lg shadow-md p-4 space-y-2 transition duration-300 ease-in-out hover:shadow-lg">
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
        </div>
      ))}
    </main>
  );
}

export { CardsConsultations };
