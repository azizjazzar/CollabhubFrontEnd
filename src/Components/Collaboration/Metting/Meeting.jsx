// Meeting.jsx

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import '@/widgets/assets/meeting.css';

function Meeting() {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicroOn, setIsMicroOn] = useState(false);

  const toggleCamera = () => {
    setIsCameraOn(prevState => !prevState);
  };

  const toggleMicro = () => {
    setIsMicroOn(prevState => !prevState);
  };

  useEffect(() => {
    const captureWebcam = async () => {
      try {
        const constraints = { video: isCameraOn, audio: isMicroOn };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (webcamRef.current) webcamRef.current.srcObject = isCameraOn ? stream : null;
      } catch (error) {
        console.error('Erreur lors de la capture vidéo:', error);
      }
    };

    captureWebcam();

    return () => {
      if (webcamRef.current && webcamRef.current.srcObject) {
        webcamRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn, isMicroOn]);

  // Mettre l'état initial à false pour cacher la webcam et désactiver le microphone
  useEffect(() => {
    setIsCameraOn(false);
    setIsMicroOn(false);
  }, []);

  return (
    <div className="meeting-container">
      <div className="video-container">
        <Webcam
          audio={isMicroOn}
          ref={webcamRef}
          mirrored={true}
          style={{ display: isCameraOn ? 'block' : 'none' }}
        />
        {!isCameraOn && <div className="webcam-off-message">Webcam désactivée</div>}
      </div>
      <div className="chat-sidebar">
        {/* Contenu de la barre latérale de chat ici */}
      </div>
      <div className="bottom-navbar">
        <button className="icon-button" onClick={toggleCamera}>
          {isCameraOn ? <FaVideo className="icon" /> : <FaVideoSlash className="icon" />}
        </button>
        <button className="icon-button" onClick={toggleMicro}>
          {isMicroOn ? <FaMicrophone className="icon" /> : <FaMicrophoneSlash className="icon" />}
        </button>
      </div>
    </div>
  );
}

export default Meeting;
