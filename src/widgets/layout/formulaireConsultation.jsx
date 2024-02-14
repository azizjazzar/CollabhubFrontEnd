import React, { useState, useEffect } from 'react';
import nft1 from '/img/details.jpg';
import nft2 from '/img/details2.jpg';
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

export function FormulaireConsultation({ open, onClose }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentImage, setCurrentImage] = useState(nft1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => prevImage === nft1 ? nft2 : nft1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!open) return null;

  return (
    <div onClick={onClose} className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='max-w-2xl w-full bg-white rounded-lg shadow-md flex overflow-y-auto' // Add overflow-y-auto for scrollbar
        style={{ maxHeight: '80vh', maxWidth: '120vh' }}
      >
        <img src={currentImage} alt='/' style={{ width: '50%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', marginTop: '100px', marginBottom: 'auto' ,marginLeft: '10px' }} />
        <div className='flex flex-col p-4 w-1/2'> {/* Set width to occupy the other half of the container */}
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="orange">
              New Consultation
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to see you! Enter your details to create a consultation
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Title
                </Typography>
                <Input
                  size="lg"
                  placeholder="Consultation Title"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <Textarea
                  size="lg"
                  placeholder="Enter description"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Price per minute
                </Typography>
                <Input
                  size="lg"
                  placeholder="Price per minute"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Expertise field
                </Typography>
                <Input
                  size="lg"
                  placeholder="Expertise field"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

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
              <Button className="mt-6" fullWidth color="orange">
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
