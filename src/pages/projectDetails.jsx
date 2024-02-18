import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [selectedTier, setSelectedTier] = useState("");
  const [tierPrices, setTierPrices] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState("");

  const handleTierChange = (event) => {
    setSelectedTier(event.target.value);
  };

  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/services/${projectId}`);
        setProjectDetails(response.data);
        setTierPrices(response.data.pricing);
        setDeliveryTime(response.data.deliveryTime);
        // Définir le tier sélectionné sur le premier tier disponible
        setSelectedTier(Object.keys(response.data.pricing)[0]);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    }
    fetchProjectDetails();
  }, [projectId]);

  // Fonction pour calculer la date de livraison en ajoutant le délai de livraison à la date actuelle
  const calculateDeliveryDate = () => {
    if (!deliveryTime) return "";
    const deliveryDays = parseInt(deliveryTime) + (tierPrices[selectedTier] !== tierPrices[Object.keys(tierPrices)[0]] ? 4 : 0); // Si le prix du tier change, ajoute 4 jours au délai de livraison
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + deliveryDays); // Ajouter le délai de livraison en jours
    return currentDate.toLocaleDateString(); // Formater la date de livraison
  };

  return (
    <div>
      <section className="relative block h-[25vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105 animate-fade-in" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <div className="container mx-auto my-8 p-6 border rounded shadow-lg flex flex-wrap gap-8">
        <div className="w-full md:flex md:w-full">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            {projectDetails && (
              <div className="bg-white border border-gray-200 rounded-lg shadow relative">
                <div className="p-5">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                    {projectDetails.title}
                  </h5>
                  {projectDetails.images && (
                    <img className="rounded-t-lg" src={projectDetails.images} alt={projectDetails.title} />
                  )}
                  <h6 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Project Details:</h6>
                  <div className="flex items-center mb-3">
                    <p className="font-bold text-gray-700 mt-2 mb-2">{projectDetails.description}</p>
                  </div>
                  <div className="flex items-center">
                    {/* Si vous souhaitez afficher des informations sur l'utilisateur, vous pouvez le faire ici */}
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
                  <div className="flex flex-row gap-2 mt-2"> {/* Modification de la classe pour aligner les éléments côte à côte */}
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
                    <span>{deliveryTime} days</span> {/* Affiche la date de livraison calculée */}
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
                  onClick={() => {
                    alert(`Continue ($${tierPrices[selectedTier]})`);
                  }}
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

export default ProjectDetails;
