import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InformationDetailsCons from '@/Components/Consultations/informationDetailsCons';
import { Footer } from "@/widgets/layout/footer";
import { FaVideo } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from "@/pages/authContext";
import axios from 'axios'; // Importer axios pour les requêtes HTTP
import AuthenticationService from "@/Services/Authentification/AuthentificationService";
import iconFour from '/img/clap.png'; 
import Statistiques from '@/Services/statistiques/Statistiques';
function DetailsConsultation() {
  const [selectedTier, setSelectedTier] = useState("30min");
  const [consultationDetails, setConsultationDetails] = useState({});
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const stripePromise = loadStripe("pk_test_51OErmACis87pjNWpmR1mA9OY8bC9joB8m3yMTqOlDqonuPHoOla3qdFxRI4l23Rqpn4RjSQjj1H75UgBbpTr2Os800jsLoQ4TE");
  const navigate = useNavigate();
  const authenticationService = new AuthenticationService();
  const StatistiquesService = new Statistiques();

  const tierPrices = {
    "30min": consultationDetails.prixParMinute,
    "60min": consultationDetails.prixParMinute * 2,
  };

  const handleTierChange = (event) => {
    setSelectedTier(event.target.value);
  };

  const selectedPrice = tierPrices[selectedTier];
  const { id } = useParams();
  const [consultationId, setConsultationId] = useState(id);
  const { authData } = useAuth();
  const [users, setUsers] = useState({});

  useEffect(() => {
    if (consultationId) {
      fetch(`https://colabhub.onrender.com/consultations/${consultationId}`)
        .then(response => response.json())
        .then(data => setConsultationDetails(data))
        .catch(error => console.error("Error fetching consultation details:", error));
    }
  }, [consultationId]);

  useEffect(() => {
    if (consultationDetails.freelancerId) {
      authenticationService.getUserById(consultationDetails.freelancerId)
        .then(userData => {
          setUsers(prevUsers => ({
            ...prevUsers,
            [consultationDetails.freelancerId]: userData
          }));
        })
        .catch(console.error);
    }
  }, [consultationDetails.freelancerId]);



  const handleBookConsultationClick = (id) => {
    setConsultationId(id);
  };

  const toggleDescription = () => {
    setShowMoreDescription(!showMoreDescription);
  };

  function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  const makePayment = async () => {
    try {

      const response = await fetch("https://colabhub.onrender.com/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedPrice,
        }),
      });
  
      const session = await response.json();
      await getToken(users[consultationDetails.freelancerId]._id,authData.user._id)
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
  
      if (result.error) {
        console.error(result.error.message);
      } else {
      
        console.log("Redirection réussie");
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
    }
  };
  
  const generateRandomAlphaNumericString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
  const getToken = async (clienta,clientb) => {
    try {
      const expirationDays = 7;
      const expirationTimestamp = Math.floor((new Date().getTime() / 1000) + (expirationDays * 24 * 60 * 60));
      const channel = generateRandomAlphaNumericString();
      const response = await axios.get(`https://colabhub.onrender.com/rtc/${channel}/${expirationTimestamp}`);
      const token = response.data.token;
      const encodedToken = encodeURIComponent(token);
      const message = `http://localhost:5173/meeting?token=${encodedToken}&channel=${channel}`;
      await StatistiquesService.addStatistique(clienta,clientb, 'in Progress ...' ,'in Progress ...', encodedToken, channel, 'in Progress ...', 'in Progress ...', 'in Progress ...');
      localStorage.setItem('token', encodedToken);
      localStorage.setItem('channel', channel);
      setMeetingUrl(message);
    } catch (error) {
      console.error('Error fetching meeting token:', error);
    }
  };

  
  
  return (
    <div className='mt-10 p-10 '>
   
      <div className="container mx-auto my-8 p-6 border rounded shadow-lg relative">
      <img
  src={`https://colabhub.onrender.com/images/${users[consultationDetails.freelancerId]?.picture}`}
  alt=""
  className="rounded-full absolute top-4 left-4"
  style={{ width: "60px", height: "60px" }}
/>

{users[consultationDetails.freelancerId] && (
  <h1 className="text-l font-bold mb-4 pl-16">
    <span style={{ color: 'black' }}>{users[consultationDetails.freelancerId].nom + " " + users[consultationDetails.freelancerId].prenom}</span>
    <br />
    <span style={{ fontSize: '24px'  , color: 'gray'}}>{consultationDetails.domaineExpertise}</span>
  </h1>
)}




        <div className="flex justify-between">
          <div className="w-3/5">
            <p className="my-4">
              {consultationDetails.description &&
                (consultationDetails.description.length > 100 || showMoreDescription)
                ? showMoreDescription
                  ? consultationDetails.description
                  : `${consultationDetails.description.substring(0, 200)}...`
                : consultationDetails.description}
              {consultationDetails.description &&
                consultationDetails.description.length > 100 && (
                  <span onClick={toggleDescription} className="text-orange-500 underline cursor-pointer">
                    {showMoreDescription ? "Less" : "More"}
                  </span>
                )}
            </p>
            {/* domaineExpertise user details */}
            <br />
          
            <div className="flex space-x-4">
              {/* Placeholder pour les détails */}
            </div>

            {/* 4 image de meeting  details */}
            <br />
            <InformationDetailsCons />
          </div>

          {/* prix par minute  30/60 details */}
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-semibold text-gray-600 dark:text-gray-300">Pricing</h5>
            <div className="flex items-center justify-between my-2">
              <label htmlFor="30min" className="flex items-center">
                <input type="radio" id="30min" name="duration" value="30min" checked={selectedTier === "30min"} onChange={handleTierChange} className="w-4 h-4" />
                <span className="ml-2 text-gray-800 dark:text-gray-300 font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }} >30 minutes</span>
              </label>
              <span className="text-xl font-semibold text-gray-600 dark:text-gray-300">${consultationDetails.prixParMinute}</span>
            </div>
            <div className="flex items-center justify-between my-2">
              <label htmlFor="60min" className="flex items-center">
                <input type="radio" id="60min" name="duration" value="60min" checked={selectedTier === "60min"} onChange={handleTierChange} className="w-4 h-4" />
                <span className="ml-2 text-gray-800 dark:text-gray-300 font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>60 minutes</span>
              </label>
              <span className="text-xl font-semibold text-gray-600 dark:text-gray-300">${consultationDetails.prixParMinute * 2}</span>
            </div>

            <h5 className="mb-4 mt-8 text-xl font-semibold text-gray-600 dark:text-gray-300">Scheduling</h5>
            <div className="mt-4">
              <label htmlFor="meetLater" className="text-blue-500 dark:text-blue-300 mr-4 font-medium flex items-center">
                <FaVideo className="mr-2" />
                <span style={{ fontSize: '16px' }}>Meet Now</span>
              </label>
              <span className="text-gray-500 dark:text-gray-400">the available date is {formatDate(consultationDetails.availabilityStart)} </span>
            </div>
            <br />
            
          

            <button
              type="button"
              className="mt-6 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-900 font-semibold rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
              onClick={makePayment} 
            >
              Continue (${selectedPrice})
            </button>
            <br></br>
           
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailsConsultation;
