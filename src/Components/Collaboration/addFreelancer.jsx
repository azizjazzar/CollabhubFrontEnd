import React from 'react'
import  { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import axios from 'axios';
export function AddFreelancer({open,handleOpen,projectId}) {

  const [freelancer, setfreelancer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();  
    setfreelancer("") ;
  
    try {

      const formData = {
        jobId: projectId,
        freelancerId : userEmailInput._id,
        
      };
   
      const response = await axios.post(`https://colabhub.onrender.com/jobs/add/${projectId}/${userEmailInput._id}`,formData);
      
  
      console.log('Server response:', response.data);
  
      alert('Freelancer added successfully');
      onClose
    } catch (error) {
      console.error('Error adding freelancer:', error);
      alert('Failed to add freelancer. Please try again.');
    }
  };  
    
    const fetchData = async(value) => {
       
        try {
          const response = await fetch("https://colabhub.onrender.com/api/auth/users");
          const json = await response.json();
        
          const results = json.filter((user) => {
            return (
              value &&
              user &&
              user.email &&
              user.email.toLowerCase().includes(value)
            );
          });
        
          setfreelancer(results);
        } catch (error) {
          console.error("Erreur de requête Fetch :", error);
        }
        
      };
      const SearchResultsList = ({ results }) => {
        return (
          <div classNameName="results-list">
            {results.map((result, id) => {
              return <SearchResult result={result} key={id} />;
            })}
          </div>
        );
      };
    const SearchResult = ({ result }) => {
        return (
          <div
            classNameName="search-result"
            onClick={(e) =>{setfreelancer(result), setuserEmailInput(result)}}
          >
            
           { result.nom +" "+  result.prenom}
            
          </div>
        );
      };
      const handleChange = (value) => {

        setuserEmailInput(value);
        fetchData(value);
    
        
      };







   
      const [userEmailInput, setuserEmailInput] = useState("");
     
  return (
    <>
     
  <Dialog open={open} size="xs" handler={handleOpen}>
  <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <DialogHeader className="flex flex-col items-start">
          {" "}
          <Typography className="mb-1" variant="h4">
            New Freelancer
          </Typography>
        </DialogHeader>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-3 h-5 w-5"
          onClick={handleOpen}
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <DialogBody>
        <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
          Add a Freelancer to this project .
        </Typography>
        <div className="grid gap-6">
          <Typography className="-mb-1" color="blue-gray" variant="h6">
            Username
          </Typography>
          <Input label="Username"  value ={!userEmailInput ? null :   userEmailInput.email}
          
            
                  onChange={(e) => handleChange(e.target.value)}
                  classNameName=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    classNameName: "before:content-none after:content-none",
                  }}/>
          {freelancer.length > 0 && (
                  <div classNameName="App">
                      {<SearchResultsList results={freelancer} />}
                   </div>
                
                  )}
          
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="gray" onClick={handleOpen}>
          cancel
        </Button>
        <Button type='submit' variant="gradient" color="gray" >
         Add Freelancer

        </Button>
       
      </DialogFooter>
      </form>
    </Dialog>
    
  </>
  )
}

export default AddFreelancer;









{/*


<input
                  size="lg"
                  
                />
                
                  */}