import React, { useState } from "react";
import PropTypes from "prop-types";

function ServiceCard({ title, image, deliveryTime, price, user }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6 hover:shadow-lg hover:border-orange-500">
      <div className="rounded-t-lg bg-gray-200" style={{ height: '180px' }}>
        {image && (
          <img
            src={image}
            className="rounded-t-lg w-full h-full object-cover"
            alt="Service Image"
          />
        )}
      </div>
      <div className="p-5">
        <div className="relative">
          <div
            className="line-clamp-2"
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            {isTooltipVisible && (
              <div className="absolute z-10 bg-white text-gray-800 text-sm p-2 rounded shadow-md">
                {title}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center mb-3">
          <p className="mr-4 font-normal text-gray-700 dark:text-gray-400">
            {deliveryTime} days delivery
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            From {price}$
          </p>
        </div>
        <hr className="horizontal-line my-3" />
        <div className="flex items-center">
          {user && user.picture && (
            <img
              src={`https://colabhub.onrender.com/images/${user.picture}`}
              alt={`Profile of ${user.nom}`}
              className="rounded-full w-12 h-12"
            />
          )}
          <div className="ml-3">
            <h3 className="text-xl font-bold">{user ? user.nom : 'Loading'}</h3>
            <div className="text-gray-600 text-sm">{user ? user.type : 'Loading'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  deliveryTime: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
  }),
};

export default ServiceCard;
