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
  }, [serviceId]);

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
    <main className="w-3/4 p-4 mx-auto pt-20 space-y-3"> {/* Ajout du padding en haut */}
<h1 className="text-2xl pt-20 font-bold mb-4 text-orange-500">My Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {requests.length > 0 ? (
            requests.map((request) => (
              <div key={request._id} className="bg-white rounded-lg shadow-md p-4 space-y-2 transition duration-300 ease-in-out hover:shadow-lg">
                <div className="flex items-center">
                  <div>
                    {/* Here you can render the profile picture if available */}
                  </div>
                  <div className="flex-grow ml-2 pt-3">
                    <h6 className="text-xl font-bold text-sm">Email: <span className="font-normal">{request.email}</span></h6>
                    <p className="text-sm font-bold">Instructions: <span className="font-normal">{request.instructions}</span></p>
                  </div>
                  <Link to={`/postWork/${request.serviceId}`}>
                    <button className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md focus:outline-none">Post Your Work Now</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No requests found.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default MyRequests;
