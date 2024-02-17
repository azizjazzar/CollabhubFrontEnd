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
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
};

const ProjectCard = ({ project }) => {
  const postedInfo = calculateTimeDifference(project.posted);

  
  return (
    <Link to={`/projects/${project._id}`} className='block bg-white rounded-lg shadow-md p-6 transition duration-300 transform hover:shadow-lg hover:scale-105'>
      <div className='mb-4 flex justify-between items-center'>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getColorForExpertise(project.expertiseLevel)}`}>
          {project.expertiseLevel}
        </span>
        <span className='text-gray-500 text-xs'>{postedInfo}</span>
      </div>
      <h3 className='text-xl font-semibold text-green-600 hover:underline mb-2'>{project.title}</h3>
      <p className='text-gray-700 mb-4 line-clamp-3'>{project.description}</p> {/* Tailwind CSS line clamp for multiline ellipsis */}
      <div className='flex justify-between items-center text-gray-600'>
        <span>Location: {project.location.city}, {project.location.state}</span>
        <span className='font-bold'>Budget: ${project.budget}</span>
      </div>
      <div className='mt-4 flex flex-wrap gap-2'>
        {project.technologies.map((tech, index) => (
          <span key={index} className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'>{tech}</span>
        ))}
      </div>
    </Link>
  );
};
function getColorForExpertise(expertiseLevel) {
  switch (expertiseLevel) {
    case 'Junior': return 'bg-yellow-200 text-yellow-800';
    case 'Intermediate': return 'bg-green-200 text-green-800';
    case 'Senior': return 'bg-blue-200 text-blue-800';
    case 'Expert': return 'bg-purple-200 text-purple-800';
    default: return 'bg-gray-200 text-gray-800';
  }
}


const ProjectCards = ({ projects }) => {
  return <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>;
};

export default ProjectCards;
