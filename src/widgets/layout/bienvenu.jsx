import React from "react";
import { Carousel } from 'flowbite-react';

export function Bienvenu() {
  return (
    <div className="flex flex-col items-center justify-center h-auto ">
  
      <div className="text-center mt-15">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          We invest in the <span className="underline underline-offset-3 decoration-8 decoration-orange-300 dark:decoration-orange-200">world’s potential</span>
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Here at CollabHub we focus on  technology, innovation, and can unlock long-term collaborations and drive economic growth.
        </p>
      </div>
    </div>
  );
}

export default Bienvenu;
