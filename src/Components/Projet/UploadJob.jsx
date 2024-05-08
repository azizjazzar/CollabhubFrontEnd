import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import TextInput from "./TextInput"; // Adjusted TextInput component
import CustomButton from "./CustomButton"; // Assuming you have this component
import ProjectCards from "./ProjectCards";
import { useAuth } from "@/pages/authContext";

const UploadJob = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [technologies, setTechnologies] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [jobs, setJobs] = useState([]); // State to store fetched jobs
  const { authData, setAuthUserData } = useAuth();
  const onSubmit = async (data) => {
    const fullData = {
      ownerId:authData.user._id,
      ...data,
      technologies: technologies.split(',').map(tech => tech.trim()),
      freelancersId: authData.user._id
    };

      console.log("data", fullData);

 

    try {
      const response = await axios.post('https://colabhub.onrender.com/jobs/add', fullData, {
        headers: { "Content-Type": "application/json" },
      });
      alert('Job posted successfully!');

      console.log("job details", response)
    } catch (error) {
      const errorMessage = error.response?.data.message || 'Failed to post job';
      setErrMsg(errorMessage);
    }
  };


   useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://colabhub.onrender.com/jobs/get/');

        setJobs(response.data.slice(0, 4)); // Assuming the API returns an array of jobs
        
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setErrMsg("Failed to fetch jobs");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#ffffff] px-5 p-20 mt-10'>
      <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
        <div>
          <p className='text-gray-900 font-semibold text-2xl mb-4'> Post a New Project </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <TextInput
                label="Job Title"
                type="text"
                placeholder="e.g., System Administrator"
                register={register}
                name="title"
                error={errors.title?.message}
              />

              <div className="flex gap-4">
                <div className="w-full">
                  <TextInput
                    label="Expertise Level"
                    type="text"
                    placeholder="e.g., Intermediate"
                    register={register}
                    name="expertiseLevel"
                    error={errors.expertiseLevel?.message}
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="Estimated Time (hours)"
                    type="number"
                    placeholder="e.g., 30"
                    register={register}
                    name="estimatedTime"
                    error={errors.estimatedTime?.message}
                  />
                </div>
              </div>

              <TextInput
                label="Duration (months)"
                type="number"
                placeholder="e.g., 6"
                register={register}
                name="duration"
                error={errors.duration?.message}
              />
              <TextInput
                label="Budget ($)"
                type="number"
                placeholder="e.g., 270"
                register={register}
                name="budget"
                error={errors.budget?.message}
              />
              <TextInput
                label="Job Description"
                type="text"
                placeholder="Describe the job"
                register={register}
                name="description"
                error={errors.description?.message}
              />
              <div className='flex flex-col mt-2'>
                <label className='text-gray-600 text-sm mb-1'>Technologies (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Linux, Windows Server"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2"
                />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                <TextInput
                  label="City"
                  type="text"
                  placeholder="e.g., Admin City"
                  register={register}
                  name="city"
                  error={errors.city?.message}
                />
                <TextInput
                  label="State"
                  type="text"
                  placeholder="e.g., IT State"
                  register={register}
                  name="state"
                  error={errors.state?.message}
                />
                 <TextInput
                label="Country"
                type="text"
                placeholder="e.g., Infrastructure Country"
                register={register}
                name="country"
                error={errors.country?.message}
              />
              </div>
             
            </div>

            {errMsg && <div className='text-sm text-red-500'>{errMsg}</div>}

            <div className="mt-4">
              <CustomButton
                type="submit"
                title="Submit"
                containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-blue-700"
              />
            </div>
          </form>
        </div>
      </div>
      
      <div className='w-full md:w-2/3 2xl:3/4 p-5 mt-20 md:mt-0'>
        <p className='text-gray-900 font-semibold mb-2'>Recent Job Posted</p>
        <div className='w-full flex flex-wrap gap-6'>
          <ProjectCards projects={jobs} />
        </div>
      </div>
    </div>
  );
};

export default UploadJob;
