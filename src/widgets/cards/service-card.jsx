import React from "react";
import PropTypes from "prop-types";

function ServiceCard({ title, image, deliveryTime, price, user }) {
  // Utilisateur statique à afficher sur chaque carte de service
  const staticUser = {
    name: "John Doe",
    image: "/img/team-1.jpg",
    position: "Freelancer",
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-96">
      {image && (
        <a href="#">
          <img className="rounded-t-lg" src={image} alt={title} />
        </a>
      )}
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <div className="flex items-center mb-3">
          <p className="mr-4 font-normal text-gray-700 dark:text-gray-400">
            {deliveryTime}
          </p>
          <p className="ml-28 font-normal text-gray-700 dark:text-gray-400">
            {price}
          </p>
        </div>
        <hr className="horizontal-line" />
        <div className="flex items-center">
          {user && user.image && (
            <img
              src={user.image}
              alt={`Profile of ${user.name}`}
              className="rounded-full"
              style={{ width: "60px", height: "60px" }}
            />
          )}
          {!user && staticUser.image && (
            <img
              src={staticUser.image}
              alt={`Profile of ${staticUser.name}`}
              className="rounded-full"
              style={{ width: "60px", height: "60px" }}
            />
          )}
          <div className="flex-grow ml-2">
            {user && (
              <>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <div className="text-gray-600 mb-1 text-sm">{user.position}</div>
              </>
            )}
            {/* Affichage de l'utilisateur statique */}
            {!user && (
              <>
                <h3 className="text-xl font-bold">{staticUser.name}</h3>
                <div className="text-gray-600 mb-1 text-sm">{staticUser.position}</div>
              </>
            )}
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
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }),
};

export default ServiceCard;
