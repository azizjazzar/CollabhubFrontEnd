import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatState } from '@/Context/ChatProvider';
const ApplyForm = () => {
     const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { authData } = ChatState();

    console.log(authData?.user._id);

    const user = authData?.user;
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        if (!file) {
            alert("Please upload a CV in PDF format.");
            return;
        }

        const formData = new FormData();
        formData.append("cv", file);
        formData.append("userId",user._id)

        try {
            await axios.post(`https://colabhub.onrender.com/jobs/jobOffers/${projectId}/apply`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Application submitted successfully!');
            navigate('/'); // Redirect or handle navigation as needed
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application.');
        }
             setTimeout(() => {
            console.log("File uploaded successfully!");
            setIsSubmitting(false);
        }, 2000);

    };

     return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md">
            <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Upload CV (PDF only):</label>
            <input
                type="file"
                id="cv"
                accept="application/pdf"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="mt-1 text-sm text-gray-500">
                {file ? file.name : "No file chosen"}
            </div>
            <button
                type="submit"
                disabled={isSubmitting || !file}
                className={`mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSubmitting || !file ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
                {isSubmitting ? "Uploading..." : "Apply Now"}
            </button>
            {isSubmitting && (
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
            )}
        </form>
    );

};

export default ApplyForm;
