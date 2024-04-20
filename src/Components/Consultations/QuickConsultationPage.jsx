import React, { useState } from "react";
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

function QuickConsultationPage() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { authData, setAuthUserData } = useAuth();
  const handleBookConsultationClick = () => {
    navigate('/details-consultation');
  };

  const handleSearchInput = async (e) => {
    const { value } = e.target;

};


  // Fonction pour ouvrir le modal
  const handleWorkWithUsClick = () => {
    setOpenModal(true);
  };

  return (
    <div>
    

      <section className="relative bg-white py-16 p-20 mt-12">
        <TitleConsultations />
      </section>

      <div className="flex justify-center content-center">
        <div className="container">
          <div className="flex justify-center items-center vh-100">
            {authData.user && (<div className="custom-button relative mb--1" onClick={handleWorkWithUsClick}>
              <div className="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
><button>
                Add a consultation
                </button>
              </div>
            </div>)}

          </div>
        </div>
      </div>

      <div className="pt-10"> 
        <div className="flex mx-auto max-w-7xl">
          <SideBarConsultations />
          {/* Card de freelancer */}
          <CardsConsultations handleSearchInput={handleSearchInput} handleBookConsultationClick={handleBookConsultationClick} />
        </div>
      </div>

      <div className={openModal ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' : 'hidden'}>
        <FormulaireConsultation open={openModal} onClose={() => setOpenModal(false)} />
      </div>
      

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default QuickConsultationPage;
