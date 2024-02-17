import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaClock, FaUserCircle } from 'react-icons/fa';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [conversationStarted, setConversationStarted] = useState(false); // Track if conversation started
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/jobs/get/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };
    fetchProject();
  }, [projectId]);

  if (!project) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }


  const handleApplyNow = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-20 text-gray-900 ml-1 ">
        
         <h3 className="text-xl md:text-3xl font-semibold mb-3 p-5" >{project.title}</h3>
      
     
         <section className="mt-8 border-t pt-6 border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Project attributes with icons */}
        <div className="space-y-4 p-2">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-700" />
            <p className="text-gray-900">Posted: {new Date(project.posted).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="mr-2 text-gray-600" />
            <p className="text-gray-900">Budget: ${project.budget}</p>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2 text-gray-600" />
            <p className="text-gray-900">Duration: {project.duration} months</p>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-600" />
            <p className="text-gray-900">Location: {project.location.city}, {project.location.state}, {project.location.country}</p>
          </div>
        </div>

        {/* Client Details */}
        <div>
          <h2 className="text-xl font-semibold mb-2 p-2 ml-0">Client Details </h2>
          <div className="flex items-center text-gray-900">
            <FaUserCircle className="mr-2 text-3xl" />
            <div>
              <p className="text-lg font-semibold">dhia aissa</p>
              <p> (50 jobs offers)</p>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Description */}
      <section className="mt-8 border-t pt-6 border-gray-300">
        <h2 className="text-xl md:text-xl font-normal mb-2">Description :</h2>
        <p>{project.description}</p>
      </section>

      {/* Skills and Technologies */}
      <section className="mt-8 border-t pt-6 border-gray-300">
        <h2 className="text-xl md:text-2xl font-normal mb-2">Skills and Technologies :</h2>
        <div className="flex flex-wrap">
          {project.technologies.map((tech, index) => (
            <span key={index} className="m-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{tech}</span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 border-t pt-6 border-gray-300">
        <h2 className="text-xl md:text-2xl font-normal mb-2">FAQ :</h2>
        <div className="text-gray-900">
          <p className="font-semibold">What is the expected turnaround time?</p>
          <p className="mb-2">We expect the project to be completed within 3-6 months, depending on the complexity.</p>
          <p className="font-semibold">Are there any specific requirements for this job?</p>
          <p>Yes, familiarity with cloud services and Docker is a must.</p>
        </div>
      </section>

     

      {/* Additional Information */}
      <section className="mt-8 border-t pt-6 border-gray-300">
        <h2 className="text-xl md:text-2xl font-normal mb-2">Additional Information :</h2>
        <ul className="list-disc pl-6 text-gray-900">
          <li className="mb-2">Flexible working hours</li>
          <li className="mb-2">Opportunity for remote work</li>
          <li>Collaborative team environment</li>
        </ul>
      </section>
      <div className="text-center mt-8 ml-2 ">
        <button onClick={handleApplyNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
          Apply Now
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaUserCircle className="text-blue-600 h-6 w-6" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Start a Conversation</h3>
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        By clicking the button below, you will start a conversation with the client to express your interest in this project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button onClick={closeModal} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                    Start Conversation
                  </button>
                </span>
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button onClick={closeModal} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;