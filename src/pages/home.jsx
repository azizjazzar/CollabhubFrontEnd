import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/index";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { ReactTyped } from "react-typed";
import { useNavigate } from 'react-router-dom';

export function Home() {
  const [backgroundImage, setBackgroundImage] = useState('/img/back1.jpg');
  const images = ['/img/back1.jpg', '/img/back2.jpg', '/img/back3.jpg'];
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundImage(prevImage => {
        const nextImageIndex = (images.indexOf(prevImage) + 1) % images.length;
        return images[nextImageIndex];
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      // Traitement pour le bouton 1
    } else if (buttonNumber === 2) {
      // Navigation vers la page "Buy Project"
     // Utilisation de la fonction navigate
    } else if (buttonNumber === 3) {
      navigate('/do-a-quick-consultation');
    }
  };

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto mt-80">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography variant="h1" color="white" className="pl-32 font-black relative">
                <div className="absolute text-xl sm:pl-10 sm:text-xl md:text-3xl lg:text-3xl xl:text-5xl">
                  Your story start{' '}
                  <ReactTyped
                    className="text-orange-400"
                    strings={['Right now', 'With Us']}
                    typeSpeed={80}
                    backSpeed={80}
                    loop
                  />
                </div>
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80 pt-20">
                Forget the hurdles in collaboration with our experts on CollabHub, achieving excellence is simpler than ever.
              </Typography>
            </div>
          </div>
          <div className="my-24 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ userSelect: 'none' }}>
            {/* Bouton 1 */}
            <div className="group border p-4 rounded-lg cursor-pointer -mb-6 hover:bg-orange-400 hover:text-white" onClick={() => handleButtonClick(1)}>
              <p className="text-white text-4xl font-bold mb-2">Post a job and hire a Pro</p>
              <p className="text-orange-400 text-xl group-hover:text-white pt-3">Talent Market place</p>
            </div>

            {/* Bouton 2 */}
            <div className="group border p-4 rounded-lg cursor-pointer -mb-6 hover:bg-orange-400 hover:text-white" onClick={() => handleButtonClick(2)}>
              <p className="text-white text-4xl font-bold mb-2">Browse and buy projects</p>
              <p className="text-orange-400 text-xl group-hover:text-white pt-3">Project Catalog</p>
            </div>

            {/* Bouton 3 */}
            <div className="group border p-4 rounded-lg cursor-pointer -mb-6 hover:bg-orange-400 hover:text-white" onClick={() => handleButtonClick(3)}>
              <p className="text-white text-4xl font-bold mb-2">Get advice from an industry expert</p>
              <p className="text-orange-400 text-xl group-hover:text-white pt-3">Consultations</p>
            </div>
          </div>
        </div>
      </div>

      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
            According to the National Oceanic and Atmospheric Administration, Ted, Scambos, NSIDClead scentist, puts the potentially record maximum.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Co-Working" heading="Build something">
            Put the potentially record low maximum sea ice extent tihs year down to low ice. According to the National Oceanic and Atmospheric Administration, Ted, Scambos.
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
