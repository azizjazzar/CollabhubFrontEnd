import React, { useState, useEffect } from 'react';
import { Avatar, Typography } from "@material-tailwind/react";
import { useParams, useNavigate } from 'react-router-dom';
import { MapPinIcon, BriefcaseIcon, BuildingLibraryIcon } from "@heroicons/react/24/solid";
import AuthenticationService from "@/Services/Authentification/AuthentificationService";
import { useAuth } from '../../pages/authContext';

export function Profile() {
  const navigate = useNavigate();
  const authenticationService = new AuthenticationService();
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const { authData, setAuthUserData } = useAuth();


  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await authenticationService.getUserById(id);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate("/error");
      }
    };
    getUser();
  }, [authenticationService, id, navigate]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('images', file);
    try {
      await authenticationService.updateUserPicture(userData.email, formData);
      const updatedUser = await authenticationService.getUserById(authDa);
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <>
      <section className="relative block h-[41vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
      </section>
      <section className="relative bg-white py-16">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-40 -mt-20">
            {
             authData.user && authData.user._id === id && (
                <input 
                  type="file" 
                  id="avatar" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleImageChange} 
                />
              )
            }

              <label htmlFor="avatar">
                <Avatar
                  src={`https://colabhub.onrender.com/images/${userData?.picture}`}
                  alt="Profile picture"
                  variant="circular"
                  className="h-full w-full"
                />
              </label>
            </div>
          </div>
          {userData && (
            <div className="mt-11 container space-y-2">
              <div className=" items-center gap-2">
                <Typography variant="h4" color="blue-gray">
                  {userData.nom} {userData.prenom}
                </Typography>
                <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">
                  {userData.email}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {userData.adresse}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {userData.type}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  University of Computer Science
                </Typography>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Profile;
