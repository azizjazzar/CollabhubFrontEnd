import React, { useState, useMemo } from 'react';
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Select from "react-select";
import countryList from 'react-select-country-list';
import axios from 'axios';

function CountrySelector() {
  const [value, setValue] = useState('');
  const options = useMemo(() => countryList().getData(), []);

  const countryOptions = [
    ...options,
  ];

  const changeHandler = (selectedOption) => {
    setValue(selectedOption);
  };

  return <Select placeholder="Select your Country" options={countryOptions} value={value} onChange={changeHandler} />;
}
export function SignUp() {

  const [user, setUser] = useState({ FirstName: '', LastName: '', Password: '' ,Email:'',ConfirmPassword:'',Country:'',Checkbox:false,Type:"Utilisateur"});

  const getUserbyEmail = async () => {
    try {
      const apiUrl = `https://colabhub.onrender.com/api/auth/user/${user.Email}`;
      const response = await axios.get(apiUrl);
  
      if (response.data.success === false) {
        console.log("Aucun utilisateur trouvé");
        // Gérer le cas où l'utilisateur n'est pas trouvé
        return false;
      } else {
        return true
        // Gérer le cas où l'utilisateur est trouvé
      }
    } catch (error) {
      console.error('Erreur lors de la requête API:', error);
    }
  }
  
  
  const Register = async () => {
    const userExists = await getUserbyEmail(); // Appel de la fonction getUserbyEmail pour obtenir le résultat
    
    if (!userExists) {
      try {
        const apiUrl = 'https://colabhub.onrender.com/api/auth/register';
        const apiPayload = {
          nom: user.FirstName,
          prenom: user.LastName,
          email: user.Email,
          mot_passe: user.ConfirmPassword,
          type: user.Type,
        };
    
        const response = await axios.post(apiUrl, apiPayload);
    
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error during API request:', error);
      }
    } else {
      console.log("Email déjà utilisé");
    }
  };
  
 
  return (
    <div className='pt-24 '>
    <section className="m-8 flex ">
      {/* Section Image (masquée sur les petits écrans) */}
      <div className="hidden md:block w-[500px] h-[50px] ml-11">
  <img
    src="/img/ba.jpg"
    className="object-cover rounded-2xl"
    alt="Pattern"
  />
</div>


      {/* Section du Formulaire */}
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center mb-4">
          <Typography variant="h2" className="font-bold">
            Join Us Today
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and password to register.
          </Typography>
        </div>

        <form className="mx-auto w-80 max-w-screen-lg lg:w-1/2">
          {/* Champs "First Name" et "Last Name" */}
          <div className="flex flex-col sm:flex-row ">
            <div className="flex-1 mr-1">
              <Input
              value={user.FirstName}
              onChange={(e) => setUser({ ...user, FirstName: e.target.value })}                
              size="lg"
                placeholder="First Name"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row mt-5 sm:mt-0">
              <Input
                value={user.LastName}
                onChange={(e) => setUser({ ...user, LastName: e.target.value })}                
                size="lg"
                placeholder="Last Name"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

          </div>

          {/* Champs "Email" et "Password" */}
          <div className=" flex flex-col gap-6 py-6">
            <Input
              value={user.Email}
              onChange={(e) => setUser({ ...user, Email: e.target.value })}                
              size="lg"
              placeholder="Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6 pb-4">
            <Input
              value={user.Password}
              onChange={(e) => setUser({ ...user, Password: e.target.value })}                
              size="lg"
              type="password"
              placeholder="Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6 pb-4">
            <Input
              value={user.ConfirmPassword}
              onChange={(e) => setUser({ ...user, ConfirmPassword: e.target.value })}                
              size="lg"
              type="password"
              placeholder="Confirm password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>    
          {/* Menu déroulant pour les pays */}
          <CountrySelector ></CountrySelector>

          {/* Checkbox "Terms and Conditions" */}
          <div className='pt-3'>
          <Checkbox 
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          </div>

          {/* Bouton "Register Now" */}
          <Button className="mt-6 bg-orange-400" fullWidth onClick={Register}>
            Register Now
          </Button>

          {/* Boutons de connexion avec Google et Twitter */}
          <div className="space-y-4 mt-8">
            <Button onClick={getUserbyEmail} size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* ... (icône Google) */}
              </svg>
              <span>Sign in With Google</span>
            </Button>
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="Twitter" />
              <span>Sign in With Twitter</span>
            </Button>
          </div>

          {/* Texte "Already have an account?" avec lien vers la page de connexion */}
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
    </div>
  );
}

export default SignUp;
