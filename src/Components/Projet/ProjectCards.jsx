import React from 'react';
import { Link } from 'react-router-dom';

const calculateTimeDifference = (postedDate) => {
  const now = new Date();
  const posted = new Date(postedDate);
  const timeDifference = now - posted;

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `Posted ${minutes}min ago`;
  } else if (hours < 24) {
    return `Posted ${hours}h ago`;
  } else {
    return `Posted ${days}d ago`;
  }
};

const ProjectCard = ({ project }) => {
  const postedInfo = calculateTimeDifference(project.posted);

  return (
    <Link
      to={`/projects/${project.id}`}
      className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer block border border-green-400'
    >
      <h3 className='text-2xl font-bold text-green-600 hover:underline mb-2'>{project.title}</h3>
      <p className='text-gray-700 mb-4'>{project.description}</p>
      <div className='flex items-center mb-2'>
        <span className='inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2'>
          {project.expertiseLevel}
        </span>
        <span className='text-gray-600'>{postedInfo}</span>
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-gray-600'>Location: {project.location.city}, {project.location.state}, {project.location.country}</p>
        </div>
        <div className='text-green-600 font-bold'>Budget: ${project.budget}</div>
      </div>
    </Link>
  );
};

const ProjectCards = ({ projects }) => {
  return <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>;
};

export default ProjectCards;
