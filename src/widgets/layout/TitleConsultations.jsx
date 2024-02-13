import React from "react";
import { FaVideo } from "react-icons/fa"; // Import de l'icône de la caméra

export function TitleConsultations() {
  return (
    <div className="text-center mt-15">
      {/* Englobez le titre, l'icône et le paragraphe dans une div avec la classe floating */}
      <div className="floating"> 
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
          Unlocking the <span className="text-orange-500">Power of Collaboration</span> Through Virtual Meetings{" "}
          <FaVideo className="inline text-blue-500" style={{ fontSize: "30px" }} /> {/* Icône de caméra en bleu */}
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Whether you need guidance, feedback, or hands-on support, our collaborative community is here to help you succeed!
        </p>
      </div>
    </div>
  );
}

export default TitleConsultations;
