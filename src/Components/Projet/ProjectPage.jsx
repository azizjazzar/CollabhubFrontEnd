import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCards from './ProjectCards';
import Pagination from './Pagination';
import AddProject from './AddProject'; // Ensure this component is correctly imported
import { Footer } from '@/index'; // Ensure the Footer is correctly imported

const ProjectPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Adjusted pageSize for demonstration
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [uniqueTechnologies, setUniqueTechnologies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      const url = `http://localhost:3000/jobs/get`;
      try {
        const response = await axios.get(url);
        const fetchedProjects = response.data;
        setProjects(fetchedProjects);

        const technologiesSet = new Set();
        fetchedProjects.forEach(project => project.technologies.forEach(tech => technologiesSet.add(tech)));
        setUniqueTechnologies(['All', ...Array.from(technologiesSet)]);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.technologies.includes(selectedCategory));
    }

    if (searchQuery) {
      filtered = filtered.filter(project => project.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    filtered = sortProjects(filtered, sortCriteria);
    setFilteredProjects(filtered);

    const totalFilteredPages = Math.ceil(filtered.length / pageSize);
    if (currentPage > totalFilteredPages) {
      setCurrentPage(totalFilteredPages || 1);
    }

    window.scrollTo(0, 0);
  }, [selectedCategory, projects, searchQuery, sortCriteria, currentPage, pageSize]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const sortProjects = (projects, criteria) => {
    switch (criteria) {
      case 'budget':
        return [...projects].sort((b, a) => a.budget - b.budget);
      case 'postedDate':
        return [...projects].sort((b, a) => new Date(a.posted) - new Date(b.posted));
      case 'expertiseLevel':
        const expertiseOrder = ['Junior', 'Intermediate', 'Senior', 'Expert'];
        return [...projects].sort((b, a) => expertiseOrder.indexOf(a.expertiseLevel) - expertiseOrder.indexOf(b.expertiseLevel));
      default:
        return projects;
    }
  };

  const toggleAddProjectModal = () => setShowAddProjectModal(!showAddProjectModal);

  // Calculate current projects for the page
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
                  <li
                    key={index}
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
              onClick={toggleAddProjectModal}
            >
              Add Project
            </button>
            <div className="sort-dropdown mb-4">
              <label htmlFor="sortCriteria">Sort By: </label>
              <select
                id="sortCriteria"
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">All</option>
                <option value="budget">Budget</option>
                <option value="postedDate">Posted Date</option>
                <option value="expertiseLevel">Expertise Level</option>
              </select>
            </div>
            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* Search icon SVG here */}
            </div>
              <ProjectCards projects={filteredProjects.slice((currentPage-1)*pageSize, currentPage*pageSize)} currentPage={currentPage} pageSize={pageSize} />
        {filteredProjects.length > 0 && (
          <Pagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
            projects={filteredProjects}
            pageSize={pageSize}
          />
        )}
            {showAddProjectModal && (
              <AddProject toggleModal={toggleAddProjectModal} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectPage;
