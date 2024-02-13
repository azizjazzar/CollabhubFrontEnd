import React from "react";
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from "@/widgets/cards/service-card";
import { PageTitle } from "@/widgets/layout";
import serviceData from "@/data/service-data";

const BuyProject = () => {
  const navigate = useNavigate();

  const navigateToProjectDetails = (projectId) => {
    navigate(`/projectDetails/${projectId}`);
  };

  return (
    <section className="px-4 pt-20 pb-48">
      <div className="container mx-auto">
        <PageTitle section="Project Catalog" heading="Clear scope, Upfront price, No surprises.">
          Complete your most pressing work with Project Catalog. Browse and buy predefined projects in just a few clicks.
        </PageTitle>
        <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
          {serviceData.map(({ id, title, image, deliveryTime, price, user }) => (
            <div key={id} onClick={() => navigateToProjectDetails(id)}>
              <ServiceCard
                title={title}
                image={image}
                deliveryTime={deliveryTime}
                price={price}
                user={user}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyProject;
