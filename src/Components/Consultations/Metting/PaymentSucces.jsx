import React, { useState, useEffect } from "react";
import axios from "axios";

function PaymentSuccess() {
  // States to store email addresses and message
  const [masterEmail, setMasterEmail] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [meetingUrl, setMeetingUrl] = useState(""); 

  useEffect(() => {
    // Retrieve email addresses from local storage
    const masterEmailFromStorage = localStorage.getItem('master');
    const clientEmailFromStorage = localStorage.getItem('client');
    setMasterEmail(masterEmailFromStorage);
    setClientEmail(clientEmailFromStorage);

    // Generate a random uid with 4 digits
    const channelName = generateRandomChannelName();
    getToken(channelName, 1710908040);
    sendEmails(masterEmail, clientEmail, meetingUrl); 

  }, []);

  // Function to send emails
  const sendEmails = async (masterEmail, clientEmail, meetingUrl) => {
    try {
      const response = await axios.post("https://colabhub.onrender.com/api/auth/email", {
        masteremail: masterEmail,
        clientemail: clientEmail,
        message: meetingUrl
      });
      console.log("Emails sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  // Function to get meeting token
  const getToken = async (channel, expiration) => {
    try {
      const response = await axios.get(`https://colabhub.onrender.com/rtc/${channel}/${expiration}`);
      const token = response.data.token;
      const encodedToken = encodeURIComponent(token); // Encodez seulement le token
      const message = `http://localhost:5173/meeting?token=${encodedToken}&channel=${channel}`;
      setMeetingUrl(message);
    } catch (error) {
      console.error('Error fetching meeting token:', error);
    }
  };
  

  // Helper function to generate a random channel name starting with "collabhub" followed by random digits
  const generateRandomChannelName = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    return `collabhub${randomNumber}`;
  };

  return (
    <div className="pt-32 ">
      <h1>Payment Successful</h1>
      <p>Master Email: {masterEmail}</p>
      <p>Client Email: {clientEmail}</p>
      <p>Meeting URL: <a href={meetingUrl}>{meetingUrl}</a></p>
    </div>
  );
}

export default PaymentSuccess;
