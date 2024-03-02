import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import io from 'socket.io-client'; 
import '@/widgets/assets/meeting.css';

function Meeting() {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicroOn, setIsMicroOn] = useState(true);
  const socketRef = useRef(null);
  const otherUserRef = useRef(null);

  useEffect(() => {
    // Connexion au serveur de signalisation
    socketRef.current = io.connect('http://localhost:5000'); 

    // Écouter les événements du serveur de signalisation
    socketRef.current.on('other user', userID => {
      callUser(userID);
      otherUserRef.current = userID;
    });
    socketRef.current.on('offer', handleReceiveCall);
    socketRef.current.on('answer', handleAnswer);
    socketRef.current.on('ice-candidate', handleNewICECandidateMsg);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const callUser = userID => {
    const peerConnection = new RTCPeerConnection();

    // Ajouter les gestionnaires d'événements pour les connexions entrantes
    peerConnection.ontrack = handleTrackEvent;
    peerConnection.onicecandidate = handleICECandidateEvent;

    // Ajouter le flux de la webcam à la connexion
    webcamRef.current.srcObject.getTracks().forEach(track => peerConnection.addTrack(track, webcamRef.current.srcObject));

    // Créer et échanger les descriptions des sessions (SDP)
    peerConnection.createOffer().then(offer => {
      peerConnection.setLocalDescription(offer);
      socketRef.current.emit('offer', offer, userID);
    });

    // Établir la connexion avec l'autre utilisateur
    peerConnection.oniceconnectionstatechange = () => {
      if (peerConnection.iceConnectionState === 'disconnected') {
        hangUp();
      }
    };
  };

  const handleReceiveCall = async (offer, userID) => {
    const peerConnection = new RTCPeerConnection();

    // Ajouter les gestionnaires d'événements pour les connexions entrantes
    peerConnection.ontrack = handleTrackEvent;
    peerConnection.onicecandidate = handleICECandidateEvent;

    // Ajouter le flux de la webcam à la connexion
    webcamRef.current.srcObject.getTracks().forEach(track => peerConnection.addTrack(track, webcamRef.current.srcObject));

    // Configurer la connexion avec l'offre reçue
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // Échanger la réponse avec l'autre utilisateur
    socketRef.current.emit('answer', answer, userID);
  };

  const handleAnswer = async (answer, userID) => {
    const peerConnection = peerConnectionMap[userID];
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleICECandidateEvent = event => {
    if (event.candidate) {
      socketRef.current.emit('ice-candidate', event.candidate, otherUserRef.current);
    }
  };

  const handleNewICECandidateMsg = async (candidate, userID) => {
    const peerConnection = peerConnectionMap[userID];
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const handleTrackEvent = event => {
    // Utiliser le flux de médias pour afficher la vidéo ou l'audio
  };

  const toggleCamera = () => {
    setIsCameraOn(prevState => !prevState);
  };

  const toggleMicro = () => {
    setIsMicroOn(prevState => !prevState);
  };

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
