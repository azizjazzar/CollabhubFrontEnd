import React, { useState, useMemo } from 'react';
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Select from "react-select";
import countryList from 'react-select-country-list';

function CountrySelector() {
  const [value, setValue] = useState('');
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = value => {
    setValue(value);
  };

  return <Select options={options} value={value} onChange={changeHandler} />;
}
export function SignUp() {
 
  return (
    <section className="m-8 flex">
      {/* Section Image (masquée sur les petits écrans) */}
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
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
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 items-center">
            <div className="flex-1">
              <Input
                size="lg"
                placeholder="First Name"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="flex-1">
              <Input
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
          <div className="mb-1 flex flex-col gap-6 py-6">
            <Input
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
              size="lg"
              type="password"
              placeholder="Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Menu déroulant pour les pays */}
          <CountrySelector></CountrySelector>

          {/* Checkbox "Terms and Conditions" */}
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

          {/* Bouton "Register Now" */}
          <Button className="mt-6 bg-orange-400" fullWidth>
            Register Now
          </Button>

          {/* Boutons de connexion avec Google et Twitter */}
          <div className="space-y-4 mt-8">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
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
  );
}

export default SignUp;
