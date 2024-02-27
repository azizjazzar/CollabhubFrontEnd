
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
      .catch(error => console.error("Error fetching tasks by project  details:", error));
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
        
          <div className="text-center mt-15">
                <div className="floating"> 
                  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
                  Regain <span className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">control</span> over your days
                  </h1>
                  <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Whether you need guidance, feedback, or hands-on support, our collaborative community is here to help you succeed!
                  </p>
                </div>
          </div>

          </section>

   

          <section className="relative bg-white py-16">
                            
                                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl py-12">
             
                          <div className="grid lg:grid-cols-3 lg:gap-4 mt-4 lg:mt-8">

                              <div className="lg:flex lg:items-center lg:justify-between border p-4 rounded mt-4 lg:mt-0">
                                  <div className="flex-1 min-w-0 mt-5 lg:mt-0">
                                      <a href="#">
                                          <div className="flex">
                                              <div>
                                                  <div className="flex lg:mt-0 lg:ml-0">
                                                      <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-400 mt-1">
                                                          <img className="rounded-full" src="https://loremflickr.com/g/320/240/girl"/>
                                                      </span>
                                                  </div>

                                              </div>

                                              <div className="ml-4">
                                                  <h2 className="text-xl font-semibold text-gray-500">
                                                      Cory Zue
                                                  </h2>
                                                  <div className="text-gray-400 text-sm">
                                                      Building an internet empire, one side-project at a time
                                                  </div>
                                                  <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                                                      <div className="mt-2 flex items-center leading-5 text-gray-400 sm:mr-6 text-sm">
                                                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="currentColor"
                                                              viewBox="0 0 20 20">
                                                              <path fill-rule="evenodd"
                                                                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                                  clip-rule="evenodd"></path>
                                                              <path
                                                                  d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z">
                                                              </path>
                                                          </svg>
                                                          7
                                                          projects
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </a>
                                  </div>
                              </div>

                              <div className="lg:flex lg:items-center lg:justify-between border p-4 rounded mt-4 lg:mt-0">
                                  <div className="flex-1 min-w-0 mt-5 lg:mt-0">
                                      <a href="#">
                                          <div className="flex">
                                              <div>
                                                  <div className="flex lg:mt-0 lg:ml-0">
                                                      <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-400 mt-1">
                                                          <img className="rounded-full" src="https://loremflickr.com/g/320/240/boy"/>
                                                      </span>
                                                  </div>

                                              </div>

                                              <div className="ml-4">
                                                  <h2 className="text-xl font-semibold text-gray-500">
                                                      Pat Walls
                                                  </h2>
                                                  <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                                                      <div className="mt-2 flex items-center leading-5 text-gray-400 sm:mr-6 text-sm">
                                                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="currentColor"
                                                              viewBox="0 0 20 20">
                                                              <path fill-rule="evenodd"
                                                                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                                  clip-rule="evenodd"></path>
                                                              <path
                                                                  d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z">
                                                              </path>
                                                          </svg>
                                                          11
                                                          projects
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </a>
                                  </div>
                              </div>

                              <div className="lg:flex lg:items-center lg:justify-between border p-4 rounded mt-4 lg:mt-0">
                                  <div className="flex-1 min-w-0 mt-5 lg:mt-0">
                                      <a href="#">
                                          <div className="flex">
                                              <div>
                                                  <div className="flex lg:mt-0 lg:ml-0">
                                                      <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-400 mt-1">
                                                          <img className="rounded-full" src="https://loremflickr.com/g/320/240/boy"/>
                                                      </span>
                                                  </div>

                                              </div>

                                              <div className="ml-4">
                                                  <h2 className="text-xl font-semibold text-gray-500">
                                                      Sharath Kuruganty
                                                  </h2>
                                                  <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                                                      <div className="mt-2 flex items-center leading-5 text-gray-400 sm:mr-6 text-sm">
                                                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="currentColor"
                                                              viewBox="0 0 20 20">
                                                              <path fill-rule="evenodd"
                                                                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                                  clip-rule="evenodd">
                                                              </path>
                                                              <path
                                                                  d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z">
                                                              </path>
                                                          </svg>
                                                          8
                                                          projects
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>

         </section>
              



                <section className="relative bg-white py-16">
      
             
        <ProjectOwnerCollab tasks={Tasks}/>
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




