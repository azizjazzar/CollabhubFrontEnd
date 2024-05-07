import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Textarea } from "@material-tailwind/react";
import axios from 'axios';
import { useAuth } from "@/pages/authContext";
import { loadStripe } from '@stripe/stripe-js';
import { useParams, useNavigate } from 'react-router-dom'; // Importez useNavigate

export function CheckoutService() {
  const [clientEmail, setClientEmail] = useState('');
  const [clientInstructions, setClientInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Ajout de l'état pour l'alerte
  const [formErrors, setFormErrors] = useState({});
  const formRef = useRef(null);
  const { authData } = useAuth();
  const staticFreelancerId = authData?.user?._id;
  const stripePromise = loadStripe("pk_test_51OErmACis87pjNWpmR1mA9OY8bC9joB8m3yMTqOlDqonuPHoOla3qdFxRI4l23Rqpn4RjSQjj1H75UgBbpTr2Os800jsLoQ4TE");
  const { serviceId } = useParams();
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        // Ne rien faire lorsque l'utilisateur clique à l'extérieur du formulaire
        // Cela empêche la fermeture du formulaire
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!clientEmail.trim()) {
      errors.clientEmail = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(clientEmail)) {
      errors.clientEmail = "Invalid email format";
    }
    if (!clientInstructions.trim()) {
      errors.clientInstructions = "Instructions are required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      // Collect client's input data
      const clientData = {
        serviceId: serviceId,
        userId: staticFreelancerId,
        email: clientEmail,
        instructions: clientInstructions,
      };

      // Faire une requête POST pour enregistrer la demande client
      const response = await axios.post('https://colabhub.onrender.com/requests/saveClientRequest', clientData);

       // Afficher une alerte en cas de succès
       setShowAlert(true); // Afficher l'alerte
       const timer = setTimeout(() => {
         setShowAlert(false); // Masquer l'alerte après 3 secondes
         navigate("/buyProject"); // Rediriger vers la page BuyProject après 3 secondes
       }, 3000);
      // Réinitialiser le formulaire
      setClientEmail('');
      setClientInstructions('');
      setFormErrors({});
       
    } catch (error) {
      console.error('Error saving client request:', error);
      // Gérer l'erreur
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Formulaire */}
      <div className="w-full max-w-lg mr-10">
        <form onSubmit={handleSubmit} ref={formRef} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="clientEmail" className="block text-gray-700 text-sm font-bold mb-2">Your Email to receive your requested work :</label>
            <Input
              type="email"
              placeholder="Enter your email..."
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              id="clientEmail"
              error={formErrors.clientEmail}
              size="lg"
            />
            {formErrors.clientEmail && <p className="text-sm text-red-500">{formErrors.clientEmail}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="clientInstructions" className="block text-gray-700 text-sm font-bold mb-2">Instructions for Freelancer:</label>
            <Textarea
              placeholder="Enter your instructions for the freelancer..."
              value={clientInstructions}
              onChange={(e) => setClientInstructions(e.target.value)}
              id="clientInstructions"
              error={formErrors.clientInstructions}
              className="h-48"
            />
            {formErrors.clientInstructions && <p className="text-sm text-red-500">{formErrors.clientInstructions}</p>}
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" color="orange" size="lg" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
  
      {/* Image */}
      <img src="/img/work.png" alt="Request 2" className="w-90 h-90" />
      
      {/* Affichage de l'alerte */}
      {showAlert && (
        <div className="bg-green-200 text-green-900 p-4 mt-4 fixed bottom-0 left-0 right-0 flex justify-center items-center">
          <span className="text-center">Your request has been sent successfully!</span>
        </div>
      )}
    </div>
  );
  
  }

export default CheckoutService;
