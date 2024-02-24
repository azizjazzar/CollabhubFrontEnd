
import React, { useState, useEffect } from 'react';
import { Footer } from '../..';
import { useParams } from 'react-router-dom';
import ProjectOwnerCollab from './projectownercollab';



export function FreelancerCollab(props) {


  const { projectId} = useParams();
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`https://colabhub.onrender.com/tasks/project/${projectId}`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching consultation details:", error));
  }, [projectId]);


  const getFormattedTime = (dateString) => {
    const dateObject = new Date(dateString);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    
    <>
 
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
   
      </section>

        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-200">
          <div className="container mx-auto">
              
              

          <section className="relative bg-white py-16 flex flex-col items-center justify-center">
                          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
                            Regain <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">control</mark> over your days
                          </h1>
                          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">
                            Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
                          </p>
          </section>



               <section className="relative bg-white py-16">
              

               <div class="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
                          
                           {Tasks.map((item,index) => (
                            <div class="px-4 my-2">
                                <div key={index} class="border-b pb-4 border-gray-400 border-dashed">
                                <p class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">{getFormattedTime(item.dateStart)}</p>
                                <a tabindex="0" class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">{item.name}</a>
                                <p class="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">{item.description}</p>
                                </div>
                                </div>

                           ))}
                             

                         
                        </div>
   
                </section>

                <section className="relative bg-white py-16">
      
             
        <ProjectOwnerCollab/>
                </section>

                

                <section className="relative bg-white py-20">

                  <Footer/>
              
                </section>

                




           
               
                 
                
           </div>
          </div>
  

         
 

   
  
 
   
    </>
   
  );
}

export default FreelancerCollab;




