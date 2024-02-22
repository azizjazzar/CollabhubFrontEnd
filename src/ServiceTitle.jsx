import React from "react";
import { FaVideo } from "react-icons/fa"; // Import de l'icône de la caméra

export function ServiceTitle() {
  return (
    <div className="text-center mt-15">
      {/* Englobez le titre, l'icône et le paragraphe dans une div avec la classe floating */}
      <div className="floating"> 
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
        Browse and buy <span className="text-orange-500">predefined projects</span> in just a few clicks.{" "}
        
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Clear scope. Upfront price. No surprises.
        </p>
      </div>
    </div>
  );
}

export default ServiceTitle;