import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsClipboard } from "react-icons/bs";

function PaymentSuccess() {
  const [masterEmail, setMasterEmail] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [meetingUrl, setMeetingUrl] = useState(""); 
  const [showAlert, setShowAlert] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyBubble, setCopyBubble] = useState(false); // État pour contrôler l'affichage de la bulle de copie

  useEffect(() => {
    const masterEmailFromStorage = localStorage.getItem('master');
    const clientEmailFromStorage = localStorage.getItem('client');
    setMasterEmail(masterEmailFromStorage);
    setClientEmail(clientEmailFromStorage);
    const channelName = generateRandomChannelName();
    const expirationDays = 7;
    const expirationTimestamp = Math.floor((new Date().getTime() / 1000) + (expirationDays * 24 * 60 * 60));
    getToken(channelName, expirationTimestamp);
    
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  const getToken = async (channel, expiration) => {
    try {
      const response = await axios.get(`https://colabhub.onrender.com/rtc/${channel}/${expiration}`);
      const token = response.data.token;
      const encodedToken = encodeURIComponent(token);
      const message = `http://localhost:5173/meeting?token=${encodedToken}&channel=${channel}`;
      setMeetingUrl(message);
    } catch (error) {
      console.error('Error fetching meeting token:', error);
    }
  };
  
  const generateRandomChannelName = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    return `collabhub${randomNumber}`;
  };

  // Fonction pour copier l'URL de la réunion dans le presse-papiers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingUrl);
    // Afficher le message "Copied!" pendant 2 secondes
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    // Afficher la bulle de copie
    setCopyBubble(true);
    setTimeout(() => {
      setCopyBubble(false);
    }, 2000);
  };

  return (
    <div className="pt-32 text-center lg:text-left lg:flex justify-center items-center h-screen">
      <div className="mb-4 lg:w-1/2 lg:text-center lg:mx-auto relative">
        <div className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Yes! Now you are ready for Your <span className="text-orange-500">Meeting!</span>
        </div>
        <br></br>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          You can just click the URL link to join your meeting or paste it into your browser's address bar.
        </p>
        <br />
        <br />
      
        <div className="flex items-start">
          <span  className="mr-2 mt-2 inline-block text-black-500"></span>
          <div className="border border-gray-300 rounded-md p-2 flex items-center max-w-[900px] overflow-hidden">
            <a href={meetingUrl} target="_blank" rel="noopener noreferrer" className="truncate">{meetingUrl}</a>
            {meetingUrl && (
              <div className="relative">
                <BsClipboard className="ml-2 cursor-pointer text-2xl text-orange-500" onClick={copyToClipboard} />
                {/* Affichage de la bulle de copie */}
                {copyBubble && (
                  <div className="absolute top-0 right-0 -mt-4 bg-orange-500 text-white px-2 py-1 rounded-md" style={{ zIndex: 999 }}>Copied!</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <aside className="w-1/4 p-4 space-y-4">
        <img
          src="/img/yes1.png"
          alt="Image description"
          style={{
            Width: "1000px",
            height: "700px",
          }}
        />
      </aside>
      {showAlert && (
       <div className="bg-green-200 text-green-900 p-4 mt-4 fixed bottom-0 left-0 right-0 flex justify-center items-center">
       <span className="text-center">Your payment has been successfully processed!</span>
     </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
