import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Textarea, Button, Typography } from "@material-tailwind/react";

export function AddServiceForm({ open, onClose }) {
  const staticFreelancerId = '65c78e6a099ed33f01e14b56'; // ID statique pour tous les enregistrements

  const [deliveryTime, setDeliveryTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricing, setPricing] = useState({ starter: '', standard: '', advanced: '' });
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
    if (!deliveryTime || !title || !description || !pricing.starter || !pricing.standard || !pricing.advanced || images.length === 0) {
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
      formData.append('freelancerId', staticFreelancerId); // Utiliser l'ID statique
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
              <div className="mb-4">
                <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">Delivery Time (in days, max 99)</label>
                <Input
                  size="lg"
                  type="number"
                  placeholder="Enter Delivery Time"
                  value={deliveryTime}
                  onChange={handleChangeDeliveryTime}
                  id="deliveryTime"
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <Input
                  size="lg"
                  placeholder="Enter Title"
                  value={title}
                  onChange={handleChangeTitle}
                  id="title"
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  size="lg"
                  placeholder="Enter Description"
                  value={description}
                  onChange={handleChangeDescription}
                  id="description"
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="starterPrice" className="block text-sm font-medium text-gray-700">Starter Price</label>
                <Input
                  size="lg"
                  type="number"
                  placeholder="Enter Starter Price"
                  value={pricing.starter}
                  onChange={handleChangePricing}
                  id="starterPrice"
                  name="starter"
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="standardPrice" className="block text-sm font-medium text-gray-700">Standard Price</label>
                <Input
                  size="lg"
                  type="number"
                  placeholder="Enter Standard Price"
                  value={pricing.standard}
                  onChange={handleChangePricing}
                  id="standardPrice"
                  name="standard"
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="advancedPrice" className="block text-sm font-medium text-gray-700">Advanced Price</label>
                <Input
                  size="lg"
                  type="number"
                  placeholder="Enter Advanced Price"
                  value={pricing.advanced}
                  onChange={handleChangePricing}
                  id="advancedPrice"
                  name="advanced"
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">Select Image</label>
                <Input
                  size="lg"
                  type="file"
                  accept="image/*"
                  placeholder="Select Image"
                  onChange={handleChangeImages}
                  id="images"
                  className="mt-1"
                />
              </div>
              {errorMessage && <Typography color="red">{errorMessage}</Typography>}
              <Button className="mt-6" fullWidth color="orange" type="submit">
                Add Service
              </Button>
            </form>
          </Card>
        </div>
        <div className="w-100 h-100">
          <img src="/img/back3.jpg" alt="Your image" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
