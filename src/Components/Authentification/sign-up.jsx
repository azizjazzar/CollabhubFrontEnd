import React, { useState, useMemo , useEffect} from 'react';
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from 'react-select-country-list';
import axios from 'axios';
import { useAuth } from '../../pages/authContext';

export function SignUp() {
  
  const { authData, setAuthUserData } = useAuth();
  const clientId ="932936140177-958d507k9pfvmkd53o46and5uv941q8l.apps.googleusercontent.com"
  const [user, setUser] = useState({ FirstName: '', LastName: '', Password: '', Email: '', ConfirmPassword: '', Country: '', Checkbox: true, Type: "Utilisateur" });
  const [selectedCountry, setSelectedCountry] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 
  useEffect(() => {
    if (authData && authData.accessToken) { 
      navigate("/");
    }
  }, [authData, navigate]);
  const onSuccess = (res)=>{
    console.log("Login Succes curent user:",res.profileobj)

  }
  const onFailure = (res)=>{
    console.log("Login Failed ! res :",res)

  }

  const CountrySelector = () => {
    const options = useMemo(() => countryList().getData(), []);
  
    const changeHandler = (selectedOption) => {
      setSelectedCountry(selectedOption);
      setErrors({ ...errors, countryError: '' }); 
    };
  
    return <Select placeholder="Select your Country" options={options} value={selectedCountry} onChange={changeHandler} />;
  }

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'FirstName':
        return value ? '' : 'Please enter your first name.';
      case 'LastName':
        return value ? '' : 'Please enter your last name.';
      case 'Email':
        return value ? (/^\S+@\S+\.\S+$/.test(value) ? '' : 'Please enter a valid email address.') : 'Please enter your email address.';
      case 'Password':
        return value ? (value.length >= 8 && /\d{3}/.test(value) ? '' : 'Password must be at least 8 characters long and contain 3 digits.') : 'Please enter your password.';
      case 'ConfirmPassword':
        return value ? (value === user.Password ? '' : 'Passwords do not match.') : 'Please confirm your password.';
      default:
        return '';
    }
  };
  
  const handleChange = (fieldName, value) => {
    setUser({ ...user, [fieldName]: value });
    setErrors({ ...errors, [`${fieldName}Error`]: validateField(fieldName, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldNames = ['FirstName', 'LastName', 'Email', 'Password', 'ConfirmPassword'];
    const newErrors = {};
    let hasError = false;

    fieldNames.forEach(fieldName => {
      const error = validateField(fieldName, user[fieldName]);
      newErrors[`${fieldName}Error`] = error;
      if (error) hasError = true;
    });

    if (!selectedCountry) {
      newErrors.countryError = "Please select your country.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const userExists = await getUserbyEmail();

    if (!userExists) {
      try {
        const apiUrl = 'https://colabhub.onrender.com/api/auth/register';
        const apiPayload = {
          nom: user.FirstName,
          prenom: user.LastName,
          email: user.Email,
          adresse: selectedCountry.label,
          mot_passe: user.ConfirmPassword,
          type: user.Type,
        };
        const response = await axios.post(apiUrl, apiPayload);
        alert('Inscription réussie !');
        console.log('API Response:', response.data);
        navigate("/sign-in")

      } catch (error) {
        console.error('Error during API request:', error);
      }
    } else {
      setErrors({ ...errors, EmailError: 'Email already exists.' });
    }
  }
    
  const getUserbyEmail = async () => {
    try {
      const apiUrl = `https://colabhub.onrender.com/api/auth/user/${user.Email}`;
      const response = await axios.get(apiUrl);

      if (response.data.success === false) {
        console.log("Aucun utilisateur trouvé");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Erreur lors de la requête API:', error);
    }
  };

  return (
    <div className='pt-24'>
      <section className="m-8 flex">
        {/* Section Image (masquée sur les petits écrans) */}
        <div className="hidden md:block w-[500px] h-[50px] ml-11">
          <img
            src="/img/ba.jpg"
            className="object-cover rounded-2xl"
            alt="Pattern"
          />
        </div>

        {/* Section du Formulaire */}
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center mt-14">
          <div className="text-center mb-4">
            <Typography variant="h2" className="font-bold">
              Join Us Today
            </Typography>
           
          </div>

          <form className="mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 mr-1">
                <Input
                  value={user.FirstName}
                  onChange={(e) => handleChange('FirstName', e.target.value)}
                  size="lg"
                  placeholder="First Name"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              {errors.FirstNameError && <p className="text-red-500">{errors.FirstNameError}</p>}
              {!errors.FirstNameError && errors.LastNameError && <p className="text-red-500">{errors.LastNameError}</p>}


              </div>
              <div className="flex flex-col sm:flex-row mt-5 sm:mt-0">
                
                <Input
                  value={user.LastName}
                  onChange={(e) => handleChange('LastName', e.target.value)}
                  size="lg"
                  placeholder="Last Name"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 py-6">
              <div>
              <Input
                value={user.Email}
                onChange={(e) => handleChange('Email', e.target.value)}
                size="lg"
                placeholder="Email"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.EmailError && <p className="text-red-500 mt-0">{errors.EmailError}</p>}
              </div>
            </div>

            <div className="mb-1 flex flex-col gap-6 pb-4">
               <div>
              <Input
                value={user.Password}
                onChange={(e) => handleChange('Password', e.target.value)}
                size="lg"
                type="password"
                placeholder="Password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.PasswordError && <p className="text-red-500">{errors.PasswordError}</p>}
              </div>

            </div>

            <div className="mb-1 flex flex-col gap-6 pb-4">
              <div>
              <Input
                value={user.ConfirmPassword}
                onChange={(e) => handleChange('ConfirmPassword', e.target.value)}
                size="lg"
                type="password"
                placeholder="Confirm password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.ConfirmPasswordError && <p className="text-red-500">{errors.ConfirmPasswordError}</p>}
              </div>
            </div>

            <CountrySelector />
            {errors.countryError && <p className="text-red-500">{errors.countryError}</p>}

            <div className='pt-3'>
            <Checkbox
              value={user.Checkbox}
              onClick={() => {setUser({ ...user, Checkbox: !user.Checkbox })
              }}
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium  p-2"
                >
                  I agree the&nbsp;
                  <a
                    href="#"
                    className="font-normal text-black transition-colors  underline "
                  >
                    Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            </div>

            <Button type="submit" className="mt-6 bg-orange-400" fullWidth>
              Register Now
            </Button>

            <div className="space-y-4 mt-8 w-[420px] flex items-center justify-center">
              <div className='w-[420px]  ' style={{ textAlign: 'center' }}>
             
              </div>
            </div>



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
