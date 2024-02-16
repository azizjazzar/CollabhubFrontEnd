import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard from "@/widgets/cards/service-card";
import "@/widgets/assets/style.scss";
import { ServiceTitle } from "@/index";

const BuyProject = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get("http://localhost:3000/services/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchServices();
  }, []);

  return (
    <>
      <section className="relative block h-[25vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105 animate-fade-in" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <section className="relative bg-white py-16">
            {/* Titre des consultations */}
            <ServiceTitle />
          </section>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {/* Affichage des cartes de service */}
            {services.map(service => (
              <div key={service._id}>
                <ServiceCard
                  title={service.title}
                  image={service.image}
                  deliveryTime={service.deliveryTime}
                  price={service.price}
                  user={service.user}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BuyProject;
