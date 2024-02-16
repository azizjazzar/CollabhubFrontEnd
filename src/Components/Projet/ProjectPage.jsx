import React, { useEffect, useState } from 'react'
import ProjectCards from './ProjectCards'
import axios from 'axios';

const ProjectPage = () => {
    const[currentPage,setCurrentPage] = useState(1);
    const pageSize = 5
    const[selectedCategory, setSelectedCategory] = useState(null)

    const [projects,setProjects] = useState([]);
    const getproject = async () => {
      const { data: res } = await axios.get("http://localhost:3000/jobs/get");
      setProjects(res);
    };
    useEffect(() => {
      getproject();
    }, []);

    console.log(projects);
    return (
      <div className="project-page-container p-8">
        <div className="text-3xl font-bold mb-8">Available Jobs</div>
  
        <div>
          {projects.length > 0 ? (
            <ProjectCards projects={projects} />
          ) : (
            <p className="text-gray-600">No available jobs at the moment.</p>
          )}
        </div>
  
        <div></div>
      </div>
    );
  };

export default ProjectPage