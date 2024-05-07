import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'antd';

const AcceuilJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setFilteredJobs(jobs.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.technologies.join(', ').toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, jobs]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/jobs/get');
      setJobs(response.data);
    } catch (error) {
      notification.error({
        message: 'Error Loading Jobs',
        description: 'There was an error loading the job offers.'
      });
    }
    setLoading(false);
  };

  const deleteJob = async (jobId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/jobs/delete/${jobId}`);
      fetchJobs();
      notification.success({
        message: 'Job Deleted',
        description: 'The job offer has been successfully deleted.'
      });
    } catch (error) {
      notification.error({
        message: 'Error Deleting Job',
        description: 'There was an error deleting the job offer.'
      });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Jobs Dashboard</h1>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-lg border-transparent flex-1 appearance-none border border-orange-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              
              
      </div>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredJobs.map(job => (
              <tr key={job._id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">{job.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">
                     <p><strong>Rate:</strong> {job.rate || 'Not specified'}</p>
                      <p><strong>Expertise Level:</strong> {job.expertiseLevel || 'Unspecified'}</p>
                      <p><strong>Duration:</strong> {job.duration || 'Unspecified'} hours</p>
                            <p><strong>Technologies:</strong> {job.technologies.join(', ')}</p>
                            <strong>Applications:</strong>
                    {job.applications.map((app, index) => (
                      <div key={index} className="mt-1">
                        {new Date(app.applyDate).toLocaleDateString()} - 
                        <a href={app.cv} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">CV</a>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                  <button
                    onClick={() => deleteJob(job._id)}
                        className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-lg text-sm px-4 py-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceuilJobs;
