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



export function FormulaireMeet({ open, onClose , userId,freelancers}) {

    const [name, setname] = useState('');
    const [description, setDescription] = useState('');
    const [dateStart, setdateStart] = useState(new Date());
    const [dateEnd, setdateEnd] = useState(new Date());
    const [nameError, setnameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [dateStartError, setdateStartError] = useState('');
    const [dateEndError, setdateEndError] = useState('');
    const [currentImage, setCurrentImage] = useState(nft1);

    //annimation images 
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImage((prevImage) => prevImage === nft1 ? nft2 : nft1);
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);
         
   
const frids =freelancers.map(freelancer => freelancer._id)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
          try {
            const formData = {
              name,
              description,
              dateStart: dateStart,
              dateEnd: dateEnd,
              ownerId:userId,
              freelancersId: frids,
             
            };
   

      
         
      
            const response = await axios.post('https://colabhub.onrender.com/meet/add', formData);
      
            console.log('Server response:', response.data);
      
            alert('meet created successfully');
            onClose();
          } catch (error) {
            console.error('Error creating meet:', error);
            alert('Failed to create meet. Please try again.');
          }
        }
      };
  
      const validate = () => {
        let isValid = true;
    
        if (!name) {
          setnameError('Please enter a title');
          isValid = false;
        } else if (!/^[a-zA-Z\s]*$/.test(name)) {
          setnameError('Title must contain only letters');
          isValid = false;
        } else {
          setnameError('');
        }
    
        if (!description) {
          setDescriptionError('Please enter a description');
          isValid = false;
        } else {
          setDescriptionError('');
        }
    
        if (dateStart >= dateEnd) {
          setdateStartError('date start must be before date  end');
          isValid = false;
        } else {
          setdateStartError('');
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
            <Typography variant="h4" color="bleu">
              Add new meeting
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to see you! Enter your details of your meet
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Title
                </Typography>
                <Input
                  size="lg"
                  placeholder="Meeting Title"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                    if (e.target.value) {
                      setnameError('');
                    }
                  }}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {nameError && <Typography color="red">{nameError}</Typography>}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {descriptionError && <Typography color="red">{descriptionError}</Typography>}            
                {/* meeting Start */}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                 Task Start
                </Typography>
                <DatePicker
                  selected={dateStart}
                  onChange={(date) => {
                    setdateStart(date);
                    if (date) {
                      setdateStartError('');
                      if (dateEnd && date >= dateEnd) {
                        setdateEndError('tasky end must be after tasky start');
                      } else {
                        setdateEndError('');
                      }
                    } else {
                      setdateStartError('Please select tasky start date');
                    }
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                {/* Message d'erreur pour l'heure de début */}
                {dateStartError && <Typography color="red">{dateStartError}</Typography>}
                
                {/* task End */}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  meeting End
                </Typography>
                <DatePicker
                  selected={dateEnd}
                  onChange={(date) => {
                    setdateEnd(date);
                    if (date) {
                      setdateEndError('');
                      if (dateStart && date <= dateStart) {
                        setdateStartError('task start must be before tasky end');
                      } else {
                        setdateStartError('');
                      }
                    } else {
                      setdateEndError('Please select tasky end date');
                    }
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                {/* Message d'erreur pour l'heure de fin */}
                {dateEndError && <Typography color="red">{dateEndError}</Typography>}
                
              </div>

              <Button className="mt-6 bg-blue-600" fullWidth  type="submit">
                Add new meeting
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FormulaireMeet;