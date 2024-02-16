import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Card,
  Input,
  Checkbox,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";

import nft1 from '/img/details.jpg';
import nft2 from '/img/details2.jpg';

export function FormulaireConsultation({ open, onClose }) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [prixParMinute, setPrixParMinute] = useState('');
  const [domaineExpertise, setDomaineExpertise] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentImage, setCurrentImage] = useState(nft1);

  const [titreError, setTitreError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [prixParMinuteError, setPrixParMinuteError] = useState('');
  const [domaineExpertiseError, setDomaineExpertiseError] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => prevImage === nft1 ? nft2 : nft1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const formData = {
          titre,
          description,
          prixParMinute,
          domaineExpertise,
          availabilityStart: startDate,
          availabilityEnd: endDate
        };
        await axios.post('http://localhost:3000/consultations/addConsultation', formData);
        alert('Consultation created successfully');
        onClose();
      } catch (error) {
        console.error('Error creating consultation:', error);
        alert('Failed to create consultation. Please try again.');
      }
    }
  };

  const validate = () => {
    let isValid = true;

    if (!titre) {
      setTitreError('Please enter a title');
      isValid = false;
    } else {
      setTitreError('');
    }

    if (!description) {
      setDescriptionError('Please enter a description');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!prixParMinute) {
      setPrixParMinuteError('Please enter a price per minute');
      isValid = false;
    } else if (isNaN(prixParMinute)) {
      setPrixParMinuteError('Please enter a valid number for price per minute');
      isValid = false;
    } else {
      setPrixParMinuteError('');
    }

    if (!domaineExpertise) {
      setDomaineExpertiseError('Please enter an expertise field');
      isValid = false;
    } else {
      setDomaineExpertiseError('');
    }

    if (startDate >= endDate) {
      setStartDateError('Availability start must be before availability end');
      isValid = false;
    } else {
      setStartDateError('');
    }

    return isValid;
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
        <img src={currentImage} alt='/' style={{ width: '50%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', marginTop: '100px', marginBottom: 'auto' ,marginLeft: '10px' }} />
        <div className='flex flex-col p-4 w-1/2'>
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="orange">
              New Consultation
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to see you! Enter your details to create a consultation
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Title
                </Typography>
                <Input
                  size="lg"
                  placeholder="Consultation Title"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {titreError && <Typography color="red">{titreError}</Typography>}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <Textarea
                  size="lg"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {descriptionError && <Typography color="red">{descriptionError}</Typography>}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Price per minute
                </Typography>
                <Input
                  size="lg"
                  placeholder="Enter your price per 30 minutes"
                  value={prixParMinute}
                  onChange={(e) => setPrixParMinute(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {prixParMinuteError && <Typography color="red">{prixParMinuteError}</Typography>}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Expertise field
                </Typography>
                <Input
                  size="lg"
                  placeholder="Expertise field"
                  value={domaineExpertise}
                  onChange={(e) => setDomaineExpertise(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {domaineExpertiseError && <Typography color="red">{domaineExpertiseError}</Typography>}
                
                {/* Availability Start */}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Availability Start
                </Typography>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                {/* Message d'erreur pour l'heure de début */}
                {startDateError && <Typography color="red">{startDateError}</Typography>}
                
                {/* Availability End */}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Availability End
                </Typography>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                {/* Message d'erreur pour l'heure de fin */}
                {endDateError && <Typography color="red">{endDateError}</Typography>}
                
              </div>
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Button className="mt-6" fullWidth color="orange" type="submit">
                Add Collaboration
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FormulaireConsultation;
