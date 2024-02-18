import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Textarea, Button, Typography } from "@material-tailwind/react";

export function AddServiceForm({ open, onClose }) {
  const [freelancerId, setFreelancerId] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricing, setPricing] = useState({ starter: '', standard: '', advanced: '' });
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeFreelancerId = (e) => {
    setFreelancerId(e.target.value);
  };

  const handleChangeDeliveryTime = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value <= 99) {
      setDeliveryTime(value);
    }
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePricing = (e) => {
    const { name, value } = e.target;
    setPricing(prevState => ({ ...prevState, [name]: value }));
  };

  const handleChangeImages = (e) => {
    // Récupérer les fichiers depuis l'événement onChange
    const selectedImages = e.target.files;
  
    // Convertir les fichiers en un tableau
    const imagesArray = Array.from(selectedImages);
  
    // Mettre à jour le state avec le tableau d'images
    setImages(imagesArray);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs non vides
    if (!freelancerId || !deliveryTime || !title || !description || !pricing.starter || !pricing.standard || !pricing.advanced || images.length === 0) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    // Vérification que deliveryTime est un nombre et est inférieur ou égal à 99
    if (isNaN(deliveryTime) || deliveryTime > 99) {
      setErrorMessage('Le délai de livraison doit être un nombre inférieur ou égal à 99.');
      return;
    }

    // Vérification que les prix sont des nombres
    if (isNaN(pricing.starter) || isNaN(pricing.standard) || isNaN(pricing.advanced)) {
      setErrorMessage('Les prix doivent être des nombres.');
      return;
    }

    // Vérification que les prix sont dans l'ordre ascendant
    if (parseInt(pricing.starter) >= parseInt(pricing.standard) || parseInt(pricing.standard) >= parseInt(pricing.advanced)) {
      setErrorMessage('Les prix doivent être dans l\'ordre croissant (Starter < Standard < Advanced).');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('freelancerId', freelancerId);
      formData.append('deliveryTime', deliveryTime);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('pricing[starter]', pricing.starter);
      formData.append('pricing[standard]', pricing.standard);
      formData.append('pricing[advanced]', pricing.advanced);
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
      await axios.post('http://localhost:3000/services/addServices', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Service added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service. Please try again.');
    }
  };

  if (!open) return null;

  return (
    <div onClick={onClose} className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='max-w-2xl w-full bg-white rounded-lg shadow-md flex overflow-y-auto'
        style={{ maxHeight: '80vh', maxWidth: '120vh' }}
      >
        <div className='flex flex-col p-4 w-full'>
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="orange">
              Add Your Service
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Fill in the details to add your service
            </Typography>
            <form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
              <Input
                size="lg"
                placeholder="Freelancer ID"
                value={freelancerId}
                onChange={handleChangeFreelancerId}
                className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                title="Freelancer ID"
              />
              <Input
                size="lg"
                type="number"
                placeholder="Delivery Time (in days, max 99)"
                value={deliveryTime}
                onChange={handleChangeDeliveryTime}
                className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                title="Delivery Time"
              />
              <Input
                size="lg"
                placeholder="Title"
                value={title}
                onChange={handleChangeTitle}
                className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                title="Title"
              />
              <Textarea
                size="lg"
                placeholder="Description"
                value={description}
                onChange={handleChangeDescription}
                className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                title="Description"
              />
              <Input
                size="lg"
                type="number"
                placeholder="Starter Price"
                value={pricing.starter}
                onChange={handleChangePricing}
                name="starter"
                className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                title="Starter Price"
              />
              <Input
                size="lg"
                type="number"
                placeholder="Standard Price"
                value={pricing.standard}
                onChange={handleChangePricing}
                name="standard"
                className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                title="Standard Price"
              />
              <Input
                size="lg"
                type="number"
                placeholder="Advanced Price"
                value={pricing.advanced}
                onChange={handleChangePricing}
                name="advanced"
                className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                title="Advanced Price"
              />
              <Input
                size="lg"
                type="file"
                accept="image/*"
                placeholder="Select Image"
                onChange={handleChangeImages}
                className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
                title="Select Image"
              />
              {errorMessage && <Typography color="red">{errorMessage}</Typography>}
              <Button className="mt-6" fullWidth color="orange" type="submit">
                Add Service
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
