import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostWorkPage = () => {
  const { serviceId } = useParams();
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceResponse = await axios.get(`http://localhost:3000/services/${serviceId}`);
        setDeliveryTime(serviceResponse.data.deliveryTime);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [serviceId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/comments/${serviceId}`, { content: newComment });
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmitFile = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`http://localhost:3000/upload/${serviceId}`, formData);
      alert("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center h-screen">
      <div className="lg:w-1/2 p-4 lg:pl-10">
        <img
          src="/img/posthere.png"
          alt="Image description"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="lg:w-1/2 p-4">
        <div className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 mb-4 md:text-5xl lg:text-6xl dark:text-white">
          Hi! You Can Post Your Work <span className="text-orange-500">Here!</span>
        </div>
        <div className="mb-4" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={handleClick}>
          <div className="w-full h-40 border border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer">
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <p className="text-gray-400">Drop your file here or click to browse</p>
          </div>
          {file && <p className="text-gray-700 mt-2">{file.name}</p>}
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          <br></br>
          <button onClick={handleSubmitFile} disabled={!file || isUploading} className="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center">
            Upload File
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default PostWorkPage;