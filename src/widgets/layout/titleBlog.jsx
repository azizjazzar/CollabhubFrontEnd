import React from "react";
import { FaVideo } from "react-icons/fa"; 

export function TitleBlog() {
  return (
    <div className="text-center mt-15">
      {/* Englobez le titre, l'icône et le paragraphe dans une div avec la classe floating */}
      <div className="floating"> 
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
          Explore the <span className="text-orange-500">World of Blogging</span> Through Engaging Content{" "}
         
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Whether you seek inspiration, knowledge, or connection, our vibrant community is here to enrich your blogging journey!
        </p>
      </div>
    </div>
  );
}

export default TitleBlog;
