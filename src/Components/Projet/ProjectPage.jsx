import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCards from './ProjectCards';
import Pagination from './Pagination';
import { Footer } from '@/index';
import { useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react'; 

const ProjectPage = () => {
    let navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [uniqueTechnologies, setUniqueTechnologies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All'); 
    const [cvData, setCvData] = useState({ skills: [], experienceLevel: '' });
    const [uploadError, setUploadError] = useState('');
    const [showModal, setShowModal] = useState(false);

        const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);


    useEffect(() => {
        fetchProjects();
    }, []); // Dependency array is empty to run only on mount

    useEffect(() => {
        filterProjects(); // This will re-run filtering whenever cvData or selectedCategory changes
    }, [cvData, selectedCategory]); // Added selectedCategory to dependency array

    const fetchProjects = async () => {
        const url = `http://localhost:3000/jobs/get`;
        try {
            const { data } = await axios.get(url);
            setProjects(data);
            setFilteredProjects(data); // Initialize filteredProjects
                        setIsLoading(false); // Stop loading once data is fetched
            const technologiesSet = new Set(data.map(project => project.technologies).flat());
            setUniqueTechnologies(['All', ...technologiesSet]);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

     const filterProjects = () => {
        let filtered = projects.filter(project =>
            (selectedCategory === 'All' || project.technologies.includes(selectedCategory)) &&
            (cvData.skills.length === 0 || project.technologies.some(tech => cvData.skills.includes(tech.toLowerCase()))) &&
            (!cvData.experienceLevel || project.expertiseLevel.toLowerCase() === cvData.experienceLevel)
        );
        if (filtered.length === 0) { // Fallback to all projects if no matches found
            filtered = projects;
        }
        setFilteredProjects(filtered);
    };

     const handleCVUpload = async (event) => {
        setIsLoading(true);
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const { data } = await axios.post('http://localhost:5000/upload_cv', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const skills = data.skills ? data.skills.split(',').map(skill => skill.trim().toLowerCase()) : [];
            const experienceLevel = data.experience_level ? data.experience_level.toLowerCase() : '';
            setCvData({ skills, experienceLevel });
            setShowModal(true);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 9000); // Success message disappears after 3 seconds
            setIsLoading(false);
            filterProjects(); // Re-run filter to apply new CV data
        } catch (error) {
            console.error('Error uploading CV:', error);
            setUploadError('Failed to upload CV. Please try again.');
            setIsLoading(false);
        }
    };

      const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        filterProjects(); // Re-run filter with the new category
        setCurrentPage(1);
    };

        const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

        const redirectToUpload = () => {
        navigate('/addproject');
  };

   const startIndex = (currentPage - 1) * pageSize;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + pageSize);


    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <div className="grid grid-cols-4 gap-8 p-20">
                    <div className="col-span-1 p-6 bg-white rounded-lg shadow-sm">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Technologies</h2>
                            <ul className="space-y-2">
                                {uniqueTechnologies.map((technology, index) => (
                                    <li key={index}
                                        className={`cursor-pointer text-gray-700 hover:text-blue-500 ${selectedCategory === technology ? 'text-blue-600 font-semibold bg-blue-100' : 'font-normal'} rounded-md p-2 hover:bg-blue-50`}
                                        onClick={() => handleCategoryChange(technology)}
                                    >
                                        {technology}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                  <div className="col-span-3 p-10 bg-white rounded-lg shadow-md relative">
                        <button
                            className="absolute right-0 top-0 mr-4 mt-11 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                            onClick={redirectToUpload}
                        >
                            Add Project
                        </button>
                        
                         <button onClick={() => document.getElementById('cv-upload').click()} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                            Upload CV
                        </button>
                   <input id="cv-upload" type="file" onChange={handleCVUpload} accept=".pdf" style={{ display: 'none' }} />
                        {isLoading && <div className="text-center">Loading...</div>}
                        {showSuccess && <div className="text-green-500 text-center">CV processed successfully!</div>}
                        {uploadError && <div className="text-red-500 text-center">{uploadError}</div>}
                        {showModal && <CVDataModal data={cvData} onClose={() => setShowModal(false)} />}
                              <Transition
                            show={true}
                            enter="transition-opacity duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <ProjectCards projects={filteredProjects} />
                        </Transition>
                        {filteredProjects.length > 0 && (
                            <Pagination
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                                projects={filteredProjects}
                                pageSize={pageSize}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

    const CVDataModal = ({ data, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-5 rounded-lg max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto text-center z-50" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Extracted CV Information</h2>
                <p><strong>Skills:</strong> {data.skills.length > 0 ? data.skills.join(', ') : 'No skills extracted'}</p>
                <p><strong>Experience Level:</strong> {data.experienceLevel || 'No experience level extracted'}</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
} ;


export default ProjectPage;
