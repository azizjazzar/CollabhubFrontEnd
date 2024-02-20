import { useEffect, useState } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa"; // Import missing icon
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CustomButton from "./CustomButton";
import ProjectCards from "./ProjectCards";
import { Footer } from "@/index";

const ProjectDetail = () => {
    let navigate = useNavigate();
    const { projectId } = useParams();
    const [project, setProject] = useState({ technologies: [] });
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState("0");
    const [similarJobs, setSimilarJobs] = useState([]);

    useEffect(() => {
        const fetchProjectAndJobs = async () => {
            try {
                const projectResponse = await axios.get(`http://localhost:3000/jobs/get/${projectId}`);
                setProject(projectResponse.data);

                const jobsResponse = await axios.get("http://localhost:3000/jobs/get");
                const jobs = jobsResponse.data;

                const similar = jobs.filter((job) =>
                    job.technologies.some((tech) =>
                        projectResponse.data.technologies.includes(tech)
                    )
                );

                setSimilarJobs(similar);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProjectAndJobs();
    }, [projectId]);

    const handleApplyNow = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const redirectToChat = () => {
        navigate("/chat");
    };

    return (
        <div className="container mx-auto px-4 md:px-20 py-10">
            <div className="md:flex md:gap-10 py-20">
                {/* LEFT SIDE */}
                <div className="md:w-1/2 bg-white px-8 py-10 shadow-md">
                    <div className='w-full flex items-center justify-between'>
                        <div className='w-3/4 flex gap-2'>
                            <img
                                src={project.image} // Replace with actual image source
                                className='w-20 h-20 md:w-24 md:h-20 rounded'
                            />

                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold text-gray-600'>
                                    {project.title}
                                </p>
                                <span className='text-base'>{project.location && project.location.city}</span>
                                <span className='text-base text-blue-600'> {project.location && project.location.state}, {project.location && project.location.country}</span>
                                <span className='text-gray-500 text-sm'>
                                    {new Date(project.posted).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className=''>
                            <AiOutlineSafetyCertificate className='text-3xl text-blue-500' />
                        </div>
                    </div>

                    <div className='w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
                        <div className='bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                            <span className='text-sm'>Salary </span>
                            <p className='text-lg font-semibold text-gray-700'>
                                ${project.budget}
                            </p>
                        </div>

                        <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                            <span className='text-sm'>Job Type</span>
                            <p className='text-lg font-semibold text-gray-700'>
                                {project.expertiseLevel}
                            </p>
                        </div>
                        <div className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
                            <span className='text-sm'>Duration</span>
                            <p className='text-lg font-semibold text-gray-700'>
                                {project.duration} Months
                            </p>
                        </div>
                    </div>
                    
                    <section className="mt-12 border-t pt-8 border-gray-300 dark:border-gray-600">
                        <h2 className="text-xl md:text-xl font-normal mb-2"> Skills and Technologies:</h2>
                        <div className="flex flex-wrap justify-start items-center gap-2">
                            {project.technologies.map((tech, index) => (
                                <span 
                                    key={index} 
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-sm font-medium shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-blue-800"
                                    tabIndex="0"
                                    aria-label={`Technology: ${tech}`}
                                    role="button"
                                    onKeyPress={(e) => e.key === 'Enter' && console.log(`${tech} clicked`)}
                                    onClick={() => console.log(`${tech} clicked`)}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    <div className='w-full flex gap-4 py-5'>
                        <CustomButton
                            onClick={() => setSelected("0")}
                            title='Job Description'
                            containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                                selected === "0"
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-300"
                            }`}
                        />

                        <CustomButton
                            onClick={() => setSelected("1")}
                            title='User Details'
                            containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                                selected === "1"
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-300"
                            }`}
                        />
                    </div>

                    <div className='my-6'>
                        {selected === "0" ? (
                            <>
                                <p className='text-xl font-semibold'>Job Description</p>
                                <p className='mt-4 text-base'>{project.description}</p>
                                <div className='mt-8'>
                                    <p className='text-xl font-semibold'>Requirements</p>
                                    {project.technologies && project.technologies.length > 0 ? (
                                        <>
                                            <p className='mt-4 text-base'>We're looking for individuals who thrive on applying their technical expertise creatively across various domains. Our ideal candidates are familiar with technologies such as:</p>
                                            <div className='mt-2 flex flex-wrap'>
                                                {project.technologies.map((tech, index) => (
                                                    <div key={index} className='m-2'>
                                                        <div className='tooltip' data-tip={`Learn more about ${tech}`}>
                                                            <span className='badge font-semibold'>{tech}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className='mt-4 text-base'>Adaptability, eagerness to learn new technologies, and the ability to innovate are what we value most. We encourage a mindset geared towards continuous improvement and creative problem-solving.</p>
                                        </>
                                    ) : (
                                        <p className='mt-4 text-base'>Flexibility in skills and a keen problem-solving ability are key. We cherish a continuous learning mindset in our dynamic tech environment.</p>
                                    )}
                                </div>
                            </>
                        )  : (
                            <>
                                <div className='mb-6 flex flex-col'>
                                    <p className='text-xl text-blue-600 font-semibold'>
                                        {project.budget}
                                    </p>
                                    <span className='text-base'>ok</span>
                                    <span className='text-sm'>ok</span>
                                </div>
                                <p className='text-xl font-semibold'>About Company</p>
                                <span>ok</span>
                            </>
                        )}
                    </div>

                    <div className='w-full'>
                        <CustomButton
                            onClick={handleApplyNow}
                            title='Apply Now'
                            containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
                        />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="md:w-1/2 mt-10 md:mt-0">
                    <p className='text-gray-500 font-semibold mb-5'>Similar Job Posts</p>
                    <ProjectCards projects={similarJobs.map(job => ({...job, id: job._id}))} />
                </div>
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
                                    <button onClick={redirectToChat} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
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

            <Footer/>
        </div>
    );
};

export default ProjectDetail;
