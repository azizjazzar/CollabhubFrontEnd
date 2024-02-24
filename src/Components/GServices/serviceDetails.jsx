import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/pages/authContext";
import axios from "axios";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [selectedTier, setSelectedTier] = useState("");
  const [tierPrices, setTierPrices] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState("");
  const navigate = useNavigate();
  const { authData } = useAuth();

  const handleTierChange = (event) => {
    setSelectedTier(event.target.value);
  };

  const makePayment = () => {
    if (!authData.user) {
      navigate('/sign-in');
    } else {
      alert(`Continue ($${tierPrices[selectedTier]})`);
    }
  };

  useEffect(() => {
    async function fetchServiceDetails() {
      try {
        const response = await axios.get(`https://colabhub.onrender.com/services/${serviceId}`);
        const data = response.data;
        setServiceDetails(data);
        setTierPrices(data.pricing);
        setDeliveryTime(data.deliveryTime);
        setSelectedTier(Object.keys(data.pricing)[0]);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    }
    fetchServiceDetails();
  }, [serviceId]);

  const calculateDeliveryDate = () => {
    if (!deliveryTime) return "";
    const deliveryDays = parseInt(deliveryTime) + (tierPrices[selectedTier] !== tierPrices[Object.keys(tierPrices)[0]] ? 4 : 0);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + deliveryDays);
    return currentDate.toLocaleDateString();
  };

  return (
    <div className="p-10 mt-10">
    
      <div className="container mx-auto my-8 p-6 border rounded shadow-lg flex flex-wrap gap-8 ">
        <div className="w-full md:flex md:w-full">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            {serviceDetails && (
              <div className="bg-white border border-gray-200 rounded-lg shadow relative">
                <div className="p-5">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                    {serviceDetails.title}
                  </h5>
                  {serviceDetails.images && (
                    <img className="rounded-t-lg" src={serviceDetails.images} alt={serviceDetails.title} />
                  )}
                  <h6 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Service Details:</h6>
                  <div className="flex items-center mb-3">
                    <p className="font-bold text-gray-700 mt-2 mb-2">{serviceDetails.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/3 mt-2 ml-28">
            {tierPrices && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Select service tier</h3>
                  <div className="flex flex-row gap-2 mt-2">
                    {Object.keys(tierPrices).map((tier) => (
                      <div className="flex items-center" key={tier}>
                        <input
                          type="radio"
                          id={tier}
                          name="tier"
                          value={tier}
                          className="w-4 h-4 text-green-600"
                          checked={selectedTier === tier}
                          onChange={handleTierChange}
                        />
                        <label htmlFor={tier} className="ml-2 text-sm font-medium text-gray-700">
                          {tier.charAt(0).toUpperCase() + tier.slice(1)} ${tierPrices[tier]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="flex justify-between my-2">
                    <span>Delivery Time</span>
                    <span>{deliveryTime} days</span>
                  </div>
                  <div className="flex justify-between my-2">
                    <span>Number of Pages</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between my-2">
                    <span>Number of Revisions</span>
                    <span>4</span>
                  </div>
                  <div className="flex justify-between my-2">
                    <span>Source Files</span>
                    <i className="fas fa-check text-green-500"></i>
                  </div>
                  <div className="flex justify-between my-2">
                    <span>Commercial Use</span>
                    <i className="fas fa-check text-green-500"></i>
                  </div>
                </div>

                <div className="my-2 text-sm text-gray-500">
                  <i className="fas fa-info-circle text-xs mr-1"></i> {deliveryTime} days delivery — {calculateDeliveryDate()} Revisions may occur after this date.
                </div>

                <button
                  type="button"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded mt-4 hover:bg-orange-600"
                  onClick={makePayment}
                >
                  Continue (${tierPrices[selectedTier]})
                </button>
                <button
                  type="button"
                  className="w-full bg-transparent text-orange-500 py-2 px-4 rounded mt-2 hover:bg-orange-100"
                >
                  Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
