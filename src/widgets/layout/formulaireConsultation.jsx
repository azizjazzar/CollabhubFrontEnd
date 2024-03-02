import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "@/pages/authContext";
import { FaTimes } from 'react-icons/fa';
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
  const [meetingTopics, setMeetingTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [description, setDescription] = useState('');
  const [prixParMinute, setPrixParMinute] = useState('');
  const [domaineExpertise, setDomaineExpertise] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentImage, setCurrentImage] = useState(nft1);
  const { authData, setAuthUserData } = useAuth();
  const [titreError, setTitreError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [prixParMinuteError, setPrixParMinuteError] = useState('');
  const [domaineExpertiseError, setDomaineExpertiseError] = useState('');
  const [meetingTopicsError, setMeetingTopicsError] = useState('');
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
          freelancerId: authData.user._id,
          meetingTopics: meetingTopics,
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

    if (!description) {
      setDescriptionError('Please enter a description');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!prixParMinute || prixParMinute < 0) {
      setPrixParMinuteError('Please enter a valid price per minute');
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
    } else if (!/^[a-zA-Z&,| \s]*$/.test(domaineExpertise)) {
      setDomaineExpertiseError('Expertise field must contain only letters');
      isValid = false;
    } else {
      setDomaineExpertiseError('');
    }

    if (meetingTopics.length === 0) {
      setMeetingTopicsError('Please enter at least one meeting topic');
      isValid = false;
    } else {
      setMeetingTopicsError('');
    }

    if (startDate >= endDate) {
      setStartDateError('Availability start must be before availability end');
      isValid = false;
    } else {
      setStartDateError('');
    }

    return isValid;
  };

  // Fonction pour effacer le message d'erreur des Meeting Topics lors de la saisie
  const handleMeetingTopicsChange = (e) => {
    const value = e.target.value;
    // Filtrer les caractères non alphabétiques
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    // Mettre à jour le champ avec les caractères filtrés
    setNewTopic(filteredValue);
    // Mettre à jour le message d'erreur
    if (filteredValue !== value) {
      setMeetingTopicsError('Meeting Topics must contain only letters');
    } else {
      setMeetingTopicsError('');
    }
  };

  const handleAddTopic = () => {
    // Vérifier si le nombre de meeting topics est inférieur à 5 avant d'en ajouter un nouveau
    if (meetingTopics.length < 5 && newTopic.trim() !== '') {
      setMeetingTopics([...meetingTopics, newTopic.trim()]);
      setNewTopic('');
    } else if (meetingTopics.length >= 5) {
      // Afficher un message d'erreur si la limite est atteinte
      setMeetingTopicsError('Maximum of 5 meeting topics reached');
    }
  };
  

  const handleRemoveTopic = (index) => {
    const updatedTopics = [...meetingTopics];
    updatedTopics.splice(index, 1);
    setMeetingTopics(updatedTopics);
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
            <Typography variant="h4" color="orange" className="mb-2">
              New Consultation
            </Typography>
            <Typography color="gray" className="mb-4">
              Nice to see you! Enter your details to create a consultation
            </Typography>
            <form className="w-full max-w-screen-lg" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Meeting Topics */}
                <div className="flex flex-col">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Meeting Topics
                  </Typography>
                  <div className="flex items-center">
                    {meetingTopics.map((topic, index) => (
                      <div key={index} className="bg-gray-100 flex items-center border border-gray-300 rounded mr-2 p-2" style={{ height: '2rem' }}>
                        <Typography className="text-gray-500 px-2 py-1 rounded-full text-xs mr-2">{topic}</Typography>
                        <FaTimes style={{ fontSize: '0.75rem', color: '#F98400' }} onClick={() => handleRemoveTopic(index)} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-2">
                    <Input
                      size="sm"
                      placeholder="Enter a new topic"
                      value={newTopic}
                      onChange={handleMeetingTopicsChange} // Utiliser la nouvelle fonction ici
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{ className: "before:content-none after:content-none" }}
                    />
                    <Button size="sm" onClick={handleAddTopic} color="orange" ripple={true}>Add</Button>
                  </div>
                  {meetingTopicsError && <Typography color="red">{meetingTopicsError}</Typography>}
                </div>
                {/* Description */}
                <div className="flex flex-col">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Description
                  </Typography>
                  <Textarea
                    size="lg"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (e.target.value) {
                        setDescriptionError('');
                      }
                    }}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {descriptionError && <Typography color="red">{descriptionError}</Typography>}
                </div>
                {/* Price per 30 minutes */}
                <div className="flex flex-col">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Price per 30 minutes
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Enter your price per 30 minutes"
                    value={prixParMinute}
                    onChange={(e) => {
                      setPrixParMinute(e.target.value);
                      if (e.target.value) {
                        setPrixParMinuteError('');
                      }
                    }}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {prixParMinuteError && <Typography color="red">{prixParMinuteError}</Typography>}
                </div>
                {/* Expertise field */}
                <div className="flex flex-col">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Expertise field
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Expertise field"
                    value={domaineExpertise}
                    onChange={(e) => {
                      setDomaineExpertise(e.target.value);
                      if (e.target.value) {
                        setDomaineExpertiseError('');
                      }
                    }}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {domaineExpertiseError && <Typography color="red">{domaineExpertiseError}</Typography>}
                </div>
                {/* Availability Start */}
                <div className="flex flex-col">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Availability Start
                  </Typography>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      if (date) {
                        setStartDateError('');
                        if (endDate && date >= endDate) {
                          setEndDateError('Availability end must be after availability start');
                        } else {
                          setEndDateError('');
                        }
                      } else {
                        setStartDateError('Please select availability start date');
                      }
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MM/dd/yyyy h:mm aa"
                  />
                  {startDateError && <Typography color="red">{startDateError}</Typography>}
                </div>
                {/* Availability End */}
                <div className="flex flex-col">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Availability End
                  </Typography>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      if (date) {
                        setEndDateError('');
                        if (startDate && date <= startDate) {
                          setStartDateError('Availability start must be before availability end');
                        } else {
                          setStartDateError('');
                        }
                      } else {
                        setEndDateError('Please select availability end date');
                      }
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MM/dd/yyyy h:mm aa"
                  />
                  {endDateError && <Typography color="red">{endDateError}</Typography>}
                </div>
                {/* Checkbox for Terms and Conditions */}
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
                {/* Submit button */}
                <Button color="orange" type="submit">
                  Add Consultation
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FormulaireConsultation;
