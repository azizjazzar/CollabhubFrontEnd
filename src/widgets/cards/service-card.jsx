// Importez les modules nécessaires
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Card, Avatar, Typography } from "@material-tailwind/react";

// Définissez votre composant ServiceCard
export function ServiceCard({ title, image, deliveryTime, price, user }) {
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
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: "300px", height: "400px" }}>
      {services.map((service) => (
        <div key={service._id}>
          {service.image && (
            <a href="#">
              <img className="rounded-t-lg" src={service.image} alt={service.title} />
            </a>
          )}
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {service.title}
              </h5>
            </a>
            <div className="flex items-center mb-3">
              <p className="mr-4 font-normal text-gray-700 dark:text-gray-400">
                {service.deliveryTime}
              </p>
              <p className="ml-28 font-normal text-gray-700 dark:text-gray-400">
                {service.price}
              </p>
            </div>
            <hr className="horizontal-line" />
            <div className="flex items-center">
              {service.user && (
                <img
                  src={service.user.image}
                  alt={`Profile of ${service.user.name}`}
                  className="rounded-full"
                  style={{ width: "60px", height: "60px" }}
                />
              )}
              <div className="flex-grow ml-2">
                {service.user && (
                  <>
                    <h3 className="text-xl font-bold">{service.user.name}</h3>
                    <div className="text-gray-600 mb-1 text-sm">{service.user.position}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Définissez les propTypes pour votre composant ServiceCard
ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  deliveryTime: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }).isRequired,
};

// Exportez votre composant ServiceCard
export default ServiceCard;
