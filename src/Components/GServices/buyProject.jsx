import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import ServiceCard from "@/widgets/cards/service-card";
import "@/widgets/assets/style.scss";
import { ServiceTitle } from "@/index";
import { AddServiceForm } from "@/widgets/layout/AddServiceForm";
import { useAuth } from "@/pages/authContext";
import AuthenticationService from "@/Services/Authentification/AuthentificationService";

const BuyProject = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(8); // Nombre de services par page
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Ajout de l'état loading
  const { authData } = useAuth();
  const authenticationService = new AuthenticationService();
  const staticFreelancerId = authData?.user?._id;
  
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("https://colabhub.onrender.com/services/services");

      setServices(response.data);
      localStorage.setItem("services", JSON.stringify(response.data));

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

  const fetchMyOwnServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://colabhub.onrender.com/services/byFreelancer/${staticFreelancerId}`);
      setServices(response.data); // Mettre à jour les services avec les données récupérées
      console.log('My Own Services:', response.data);
    } catch (error) {
      console.error('Error fetching My Own Services:', error);
    } finally {
      setLoading(false);
    }
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

  // Pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Créer une liste de numéros de page
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(services.length / servicesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <section className="px-4 pt-20 pb-48 mt-10 p-10">
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
              {authData.user && (
                <div className="custom-button relative mb--1">
                  <button
                    onClick={fetchMyOwnServices}
                    className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  >
                    My Own Services
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
            {currentServices.map(service => (
              <div key={service._id}>
                {service.freelancerId === staticFreelancerId ? (
                  <Link to={`/myRequests/${service._id}`}>
                    <ServiceCardWrapper service={service} authenticationService={authenticationService} serviceId={service._id} />
                  </Link>
                
                ) : (
                  <Link to={`/serviceDetails/${service._id}`}>
                    <ServiceCardWrapper service={service} authenticationService={authenticationService} serviceId={service._id} />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </section>
      {isFormOpen && <AddServiceForm open={isFormOpen} onClose={closeForm} />}
    </>
  );
};

const ServiceCardWrapper = ({ service, authenticationService }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authenticationService.getUserById(service.freelancerId);
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [authenticationService, service.freelancerId]);

  return (
    <ServiceCard
      title={service.title}
      image={service.images[0]}
      deliveryTime={String(service.deliveryTime)} 
      price={String(service.pricing.starter)} 
      user={userData}
      serviceId={service._id} // Passer serviceId comme prop à ServiceCard
    />
  );
};

const Pagination = ({ pageNumbers, currentPage, paginate }) => {
  return (
    <nav className="mt-4 flex justify-center">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={
            currentPage === number
              ? "bg-blue-500 text-white px-4 py-2 mx-1 rounded-full focus:outline-none"
              : "bg-white text-gray-700 px-4 py-2 mx-1 rounded-full hover:bg-gray-200 focus:outline-none"
          }
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

export default BuyProject;
