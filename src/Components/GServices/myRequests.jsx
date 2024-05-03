import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const MyRequests = () => {
  const { serviceId } = useParams();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [serviceId]); // Re-fetch requests whenever serviceId changes

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`https://colabhub.onrender.com/requests/${serviceId}`);
   
      setRequests(response.data.clientRequests);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Error fetching requests. Please try again later.");
      setLoading(false);
    }
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1>My Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {requests.length > 0 ? (
            requests.map((request) => (
              <div key={request._id} className="request-card">
                <p>Email: {request.email}</p>
                <p>Instructions: {request.instructions}</p>
                <Link to={`/postWork/${request.serviceId}`}>
                  <button className="post-work-button">Post Your Work Now</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No requests found.</p>
          )}
        </div>
      )}
    </div>
  );
  
  
  
};

export default MyRequests;
