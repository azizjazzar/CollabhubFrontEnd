import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import ServiceCard from "@/widgets/cards/service-card";
import "@/widgets/assets/style.scss";
import { ServiceTitle } from "@/index";
import { AddServiceForm } from "@/widgets/layout/AddServiceForm"; // Importez le formulaire AddServiceForm

const BuyProject = () => {
  const [services, setServices] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false); // État pour contrôler l'ouverture du formulaire

  useEffect(() => {
    fetchServices(); // Charger tous les services initialement
  }, []);

  // Fonction pour charger tous les services
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:3000/services/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Fonction pour ouvrir le formulaire
  const openForm = () => {
    setIsFormOpen(true);
  };

  // Fonction pour fermer le formulaire
  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Liste des domaines d'expertise
  const expertiseDomains = [
    'All',
    'Web Development', 
    'Mobile App Development', 
    'Logo Design', 
    'Graphic Design', 
    'Video & Audio', 
    'Writing & Translation', 
    'Digital Marketing', 
    'Virtual Assistant', 
    'Other'
  ];

  // Fonction pour filtrer les services par domaine d'expertise
  const filterServicesByDomain = async (domain) => {
    if (domain === "All") {
      fetchServices(); // Charger tous les services si "All" est sélectionné
    } else {
      try {
        const response = await axios.get(`http://localhost:3000/services/byDomain/${domain}`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services by domain:", error);
      }
    }
  };

  return (
    <>
      <section className="relative block h-[25vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105 animate-fade-in" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <section className="relative bg-white py-16">
            <ServiceTitle />
            {/* Bouton "Add Your Service" au milieu de la page */}
            <div className="flex justify-center mt-8">
              <button
                onClick={openForm} // Appeler la fonction pour ouvrir le formulaire lors du clic sur le bouton
                className="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Add Your Service
              </button>
            </div>
            {/* Affichage des domaines d'expertise */}
            <div className="flex justify-center mt-10 space-x-4">
              {expertiseDomains.map((domain, index) => (
                <button
                  key={index}
                  onClick={() => filterServicesByDomain(domain)}
                  className="text-sm text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                >
                  {domain}
                </button>
              ))}
            </div>
          </section>
          <div className="mt-18 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {/* Affichage des cartes de service */}
            {services.map(service => (
              <div key={service._id}>
                <Link to={`/projectDetails/${service._id}`}>
                  <ServiceCard
                    title={service.title}
                    image={service.images[0]} // Utilisez la première image du tableau d'images
                    deliveryTime={service.deliveryTime}
                    price={service.pricing.starter}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Afficher le formulaire conditionnellement */}
      {isFormOpen && <AddServiceForm open={isFormOpen} onClose={closeForm} />}
    </>
  );
};

export default BuyProject;
