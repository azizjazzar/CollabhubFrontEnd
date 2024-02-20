import axios from "axios";
import React, { useState } from "react";

function AddProject({ getProjects, setShowModal }) {
  const [projectData, setProjectData] = useState({
    title: "",
    rate: "",
    expertiseLevel: "",
    estimatedTime: "",
    duration: "",
    budget: "",
    description: "",
    technologies: [],
    location: { city: "", state: "", country: "" },
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "technologies") {
      setProjectData({ ...projectData, [name]: value.split(",").map((tech) => tech.trim()) });
    } else if (Object.hasOwn(projectData.location, name)) {
      setProjectData({ ...projectData, location: { ...projectData.location, [name]: value } });
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("/api/project/save", projectData, config);
      getProjects(); // Refresh the projects list
      setShowModal(false); // Close the modal
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5 bg-white rounded-lg shadow-lg">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Add New Project</h2>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
          <input name="title" type="text" value={projectData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter project title" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
            <input name="rate" type="number" value={projectData.rate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="45" />
          </div>
          <div>
            <label htmlFor="expertiseLevel" className="block text-sm font-medium text-gray-700">Expertise Level</label>
            <select name="expertiseLevel" value={projectData.expertiseLevel} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        {/* Additional fields for estimatedTime, duration, etc. */}
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={projectData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" rows="4" placeholder="Project description..."></textarea>
        </div>

        <div>
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
          <input name="technologies" type="text" value={projectData.technologies.join(", ")} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., React, Node.js, MongoDB" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input name="city" type="text" value={projectData.location.city} onChange={handleChange} className="col-span-3 sm:col-span-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="City" />
          <input name="state" type="text" value={projectData.location.state} onChange={handleChange} className="col-span-3 sm:col-span-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="State" />
          <input name="country" type="text" value={projectData.location.country} onChange={handleChange} className="col-span-3 sm:col-span-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Country" />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
