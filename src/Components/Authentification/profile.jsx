import { useState, useEffect } from 'react';
import { Avatar, Typography } from "@material-tailwind/react";
import { useAuth } from "@/pages/authContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPinIcon, BriefcaseIcon, BuildingLibraryIcon } from "@heroicons/react/24/solid";

export function Profile() {
  const { authData } = useAuth();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!authData.user) {
      navigate("/");
    } else {
      fetchUserPicture();
    }
  }, [authData.user, navigate]);

  const fetchUserPicture = async () => {
    if (authData.user && authData.user.email) {
      try {
        const response = await axios.get(`https://colabhub.onrender.com/api/auth/image/${authData.user.email}`, {
          responseType: 'blob',
        });

        const imageUrl = URL.createObjectURL(response.data);
        setSelectedImage(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
        setSelectedImage('/img/default-avatar.png'); // Utilisez une image par défaut en cas d'erreur
      }
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('images', file);

    try {
      await axios.put(`https://colabhub.onrender.com/api/auth/updatePicture/${authData.user.email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchUserPicture(); // Rafraîchir l'image après le téléchargement
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
              <input 
                type="file" 
                id="avatar" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleImageChange} 
              />
              <label htmlFor="avatar">
                <Avatar
                  src={selectedImage || "/img/default-avatar.png"}
                  alt="Profile picture"
                  variant="circular"
                  className="h-full w-full"
                />
              </label>
            </div>
          </div>
          <div className="mt-11 container space-y-2">
            <div className=" items-center gap-2">
              <Typography variant="h4" color="blue-gray">
                {authData.user.nom} {authData.user.prenom}
              </Typography>
              <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">
                {authData.user.email}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
              <Typography className="font-medium text-blue-gray-500">
                {authData.user.adresse}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
              <Typography className="font-medium text-blue-gray-500">
                {authData.user.type}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
              <Typography className="font-medium text-blue-gray-500">
                University of Computer Science
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
