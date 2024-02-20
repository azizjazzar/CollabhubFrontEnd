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
      <section className="relative block h-[25vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105 animate-fade-in" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>

      <section className="relative bg-white py-16">
        {/* Titre des consultations */}
        <TitleConsultations />
      </section>

      <div className="flex justify-center content-center">
        <div className="container">
          <div className="flex justify-center items-center vh-100">
            {/* Bouton "Work With Us" pour ouvrir le modal */}
            {authData.user && (<div className="custom-button relative mb--1" onClick={handleWorkWithUsClick}>
              <div className="element">
                <p>Add a consultation</p>
              <div className="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                Add a consultation
                </button>
              </div>
            </div>)}

          </div>
        </div>
      </div>

      <div className="pt-10"> {/* Adjust the padding top here */}
        <div className="flex mx-auto max-w-7xl">
          {/* Barre latérale des consultations */}
          <SideBarConsultations />
          {/* Card de freelancer */}
          <CardsConsultations handleSearchInput={handleSearchInput} handleBookConsultationClick={handleBookConsultationClick} />
        </div>
      </div>

      {/* Affichage du formulaire de consultation */}
      <div className={openModal ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' : 'hidden'}>
        <FormulaireConsultation open={openModal} onClose={() => setOpenModal(false)} />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default QuickConsultationPage;
