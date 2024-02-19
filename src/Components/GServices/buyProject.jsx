import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import ServiceCard from "@/widgets/cards/service-card";
import "@/widgets/assets/style.scss";
import { ServiceTitle } from "@/index";
import { AddServiceForm } from "@/widgets/layout/AddServiceForm";
import { useAuth } from "@/pages/authContext";

const BuyProject = () => {
  const [services, setServices] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { authData } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("https://colabhub.onrender.com/services/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

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

  const handleWorkWithUsClick = () => {
    // Logique à exécuter lors du clic sur le bouton "Add Your Service"
    // Par exemple, rediriger l'utilisateur vers une autre page ou effectuer une autre action
  };

  const filterServicesByDomain = async (domain) => {
    if (domain === "All") {
      fetchServices();
    } else {
      try {
        const response = await axios.get(`https://colabhub.onrender.com/services/byDomain/${domain}`);
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
            <div className="flex justify-center mt-8">
              {authData.user && (
                <div className="custom-button relative mb--1">
                  <button
                    onClick={openForm}
                    className="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  >
                    Add Your Service
                  </button>
                </div>
              )}
            </div>
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
            {services.map(service => (
              <div key={service._id}>
                <Link to={`/serviceDetails/${service._id}`}>
                  <ServiceCard
                    title={service.title}
                    image={service.images[0]}
                    deliveryTime={service.deliveryTime}
                    price={service.pricing.starter}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isFormOpen && <AddServiceForm open={isFormOpen} onClose={closeForm} />}
    </>
  );
};

export default BuyProject;
