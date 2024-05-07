// QuickConsultationPage.js

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../../widgets/assets/animation.scss';
import '../../widgets/assets/style.scss';
import { Modal } from "@/index";
import { TitleConsultations, SideBarConsultations } from "@/index";
import { CardsConsultations } from "@/widgets/cards/cardsConsultations";
import { FormulaireConsultation } from "@/widgets/layout/formulaireConsultation";
import { Footer } from "@/widgets/layout/footer";
import { useAuth } from "@/pages/authContext";
import Alan from "../Authentification/Alan";
import axios from 'axios';
import PaginationBar from "./PaginationBar";

function QuickConsultationPage() {
  const [openModal, setOpenModal] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [consultationsPerPage] = useState(5); // Number of consultations per page
  const [pageNumbers, setPageNumbers] = useState([]);
  const [priceFilter, setPriceFilter] = useState(""); // State for price filter
  const navigate = useNavigate();
  const { authData, setAuthUserData } = useAuth();

  const handleBookConsultationClick = () => {
    navigate('/details-consultation');
  };

  const handleSearchInput = async (e) => {
    const { value } = e.target;
    // Your search logic here
  };

  // Fonction pour ouvrir le modal
  const handleWorkWithUsClick = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    // Fetch consultations data
    fetch("https://colabhub.onrender.com/consultations/Consultations")
      .then(response => response.json())
      .then(data => {
        // Filter consultations based on availabilityStart and price filter
        const filteredConsultations = data.filter(consultation => {
          const today = new Date(); 
          const availabilityStart = new Date(consultation.availabilityStart); 
          return availabilityStart > today && matchPriceFilter(consultation); // Match the price filter
        });
  
        // Set filtered consultations
        setConsultations(filteredConsultations);
  
        // Calculate page numbers based on filtered consultations
        const totalPageNumbers = Math.ceil(filteredConsultations.length / consultationsPerPage);
        const pageNumbersArray = [];
        for (let i = 1; i <= totalPageNumbers; i++) {
          pageNumbersArray.push(i);
        }
        setPageNumbers(pageNumbersArray);
      })
      .catch(error => console.error("Error fetching consultations:", error));
  }, [consultationsPerPage, priceFilter]); 
  
  // Function to match the price filter
  const matchPriceFilter = (consultation) => {
    if (!priceFilter) return true; // If no price filter is applied, return true
    const price = parseFloat(consultation.prixParMinute); // Convert price to float for comparison
    if (priceFilter === "<30") {
      return price < 30;
    } else if (priceFilter === "30-60") {
      return price >= 30 && price <= 60;
    } else if (priceFilter === ">60") {
      return price > 60;
    }
    return true; // Default return true if no match
  };
  
  
  // Filtrer les consultations en fonction de la date avant de les passer à CardsConsultations
  const filteredConsultations = consultations.filter(consultation => {
    const today = new Date(); 
    const availabilityStart = new Date(consultation.availabilityStart); 
    return availabilityStart > today; 
  });

  // Filtrer les consultations en fonction du prix par minute
  const priceFilteredConsultations = priceFilter ? filteredConsultations.filter(consultation => {
    // Utilisez l'opérateur de comparaison pour comparer les prix
    if (priceFilter === "<30") {
        return consultation.prixParMinute < 30;
    } else if (priceFilter === "30-60") {
        return consultation.prixParMinute >= 30 && consultation.prixParMinute <= 60;
    } else if (priceFilter === ">60") {
        return consultation.prixParMinute > 60;
    } else {
        return true; 
    }
}) : filteredConsultations;


  return (
    <div>
      <section className="relative bg-white py-16 p-20 mt-12">
        <TitleConsultations />
      </section>
      <div className="flex justify-center content-center">
        <div className="container">
          <div className="flex justify-center items-center vh-100">
            {authData.user && (
              <div className="custom-button relative mb--1" onClick={handleWorkWithUsClick}>
                <div className="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                  <button>Add a consultation</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pt-10">
        <div className="flex mx-auto max-w-7xl">
          <SideBarConsultations setPriceFilter={setPriceFilter} /> {/* Pass the setPriceFilter function */}
          {/* Card de freelancer */}
          <CardsConsultations
            handleSearchInput={handleSearchInput}
            consultationsPerPage={consultationsPerPage}
            currentPage={currentPage}
            consultations={priceFilteredConsultations} // Utiliser les consultations filtrées par prix
          />
        </div>
        <br></br>
        <br></br>
        <PaginationBar pageNumbers={pageNumbers} currentPage={currentPage} paginate={setCurrentPage} />
      </div>
      <div className={openModal ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' : 'hidden'}>
        <FormulaireConsultation open={openModal} onClose={() => setOpenModal(false)} />
      </div>
      {/* Footer */}
      <Footer />
      {/* Pass the setCurrentPage function as paginate prop */}
    </div>
  );
}

export default QuickConsultationPage;

