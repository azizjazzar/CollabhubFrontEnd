import React, { useState, useMemo } from 'react';
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Select from "react-select";
import countryList from 'react-select-country-list';
import { GoogleLogin } from 'react-google-login'
import axios from 'axios';

export function SignUp() {
  const clientId ="932936140177-958d507k9pfvmkd53o46and5uv941q8l.apps.googleusercontent.com"
  const [user, setUser] = useState({ FirstName: '', LastName: '', Password: '', Email: '', ConfirmPassword: '', Country: '', Checkbox: true, Type: "Utilisateur" });
  const [selectedCountry, setSelectedCountry] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

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

    <section className="m-8 flex">
            <div className="w-2/5 h-full hidden lg:block">
        <img
          src="https://images.pexels.com/photos/3285195/pexels-photo-3285195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>

        </div>

        {/* Section du Formulaire */}
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center mt-14">
          <div className="text-center mb-4">
            <Typography variant="h2" className="font-bold">
              Join Us Today
            </Typography>

            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Passowrd
            </Typography>
            <Input
            type="password"
              size="lg"
              placeholder="************"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

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

                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="bg-orange-400 mt-6" fullWidth>
            Register Now
          </Button>

          <div className="space-y-4 mt-8">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Google</span>
            </Button>
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
              <span>Sign in With Twitter</span>

            </Button>

            <div className="space-y-4 mt-8 w-[420px] flex items-center justify-center">
              <div className='w-[420px]  ' style={{ textAlign: 'center' }}>
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Login with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                />
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
