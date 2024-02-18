/*import React from "react";
import PropTypes from "prop-types";

function ServiceDetailsCard({ service }) {
  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow relative">
      {service.images && (
        <img className="rounded-t-lg" src={service.images} alt={service.title} />
      )}
      <div className="absolute top-0 left-0 right-0 text-center mt-4">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {service.title}
        </h5>
      </div>
      <div className="p-5">
        <div className="flex items-center mb-3">
          <p className="font-bold text-gray-700">{service.description}</p>
        </div>
        <hr className="horizontal-line" />
        <div className="flex items-center">
          {service.user && service.user.image && (
            <img
              src={service.user.image}
              alt={`Profile of ${service.user.name}`}
              className="rounded-full"
              style={{ width: "60px", height: "60px" }}
            />
          )}
          <div className="flex-grow ml-2">
            {service.user && (
              <>
                <h3 className="text-xl font-bold">{service.user.name}</h3>
                <div className="text-gray-600 mb-1 text-sm">{service.user.position}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ServiceDetailsCard.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    deliveryTime: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ServiceDetailsCard;*/
