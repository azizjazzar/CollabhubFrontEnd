import React, { useState, useEffect } from "react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { ReactTyped } from "react-typed";

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

export function Home() {
  const [backgroundImage, setBackgroundImage] = useState('/img/back1.jpg');
  const images = ['/img/back1.jpg', '/img/back2.jpg', '/img/back3.jpg'];

  const handleButtonClick = (buttonIndex) => {
    // Fonction à exécuter lorsque le bouton est cliqué
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundImage(prevImage => {
        const nextImageIndex = (images.indexOf(prevImage) + 1) % images.length;
        return images[nextImageIndex];
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="relative h-screen container mx-auto  top-[100px]">
      <div className="absolute h-full w-full z-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container  mx-auto flex flex-col justify-center items-center h-full">
          <Typography variant="h1" color="white" className="font-black text-5xl mb-8 z-40">
            Your story starts{' '}
            <ReactTyped
              className="text-orange-400"
              strings={['Right now', 'With Us']}
              typeSpeed={80}
              backSpeed={80}
              loop
            />
          </Typography>
          <Typography variant="lead" color="white" className="opacity-80 mb-16 text-center">
            Forget the hurdles in collaboration with our experts on CollabHub, achieving excellence is simpler than ever.
          </Typography>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 z-40" style={{ userSelect: 'none' }}>
              {/* Button 1 */}
              <div className="group border p-2 rounded-lg cursor-pointer hover:bg-orange-400 hover:text-white" onClick={() => handleButtonClick(1)}>
                <p className="text-white text-3xl font-bold mb-1">Post a job and hire a Pro</p>
                <p className="text-orange-400 text-lg group-hover:text-white">Talent Marketplace</p>
              </div>

              {/* Button 2 */}
              <div className="group border p-2 rounded-lg cursor-pointer hover:bg-orange-400 hover:text-white" onClick={() => handleButtonClick(2)}>
                <p className="text-white text-xl font-bold mb-1">Browse and buy projects</p>
                <p className="text-orange-400 text-sm group-hover:text-white">Project Catalog</p>
              </div>

              {/* Button 3 */}
              <div className="group border p-2 rounded-lg cursor-pointer hover:bg-orange-400 hover:text-white" onClick={() => handleButtonClick(3)}>
                <p className="text-white text-xl font-bold mb-1">Get advice from an industry expert</p>
                <p className="text-orange-400 text-sm group-hover:text-white">Consultations</p>
              </div>
            </div>

        </div>
      </div>

      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Co-Working" heading="Build something">
            Put the potentially record low maximum sea ice extent this year down to low ice. According to the National Oceanic and Atmospheric Administration, Ted, Scambos.
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
