import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPaperPlane, FaDesktop } from 'react-icons/fa'; 
import { VideoPlayer } from './VideoPlayer';
import { useAuth } from '@/pages/authContext';
import '@/widgets/assets/meeting.css'; // Import du fichier CSS
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from '@material-ui/core'; // Import de IconButton de Material-UI

const APP_ID = "36067b6e79984e48828b420ceeea0b5c";
const TOKEN = "007eJxTYLihsXevEu/xWX/YD3IlXljx9Oi7s81L0m+pv+DRusYSdFBBgcHYzMDMPMks1dzS0sIk1cTCwsgiycTIIDk1NTXRIMk0+azr49SGQEaG6RMmszAyQCCIz8ngnJ+Tk5iUUZrEwAAAaw4jBg==";
const CHANNEL = "Collabhub";

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});

export const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false); // State to track screen sharing
    const { authData, setAuthUserData } = useAuth();
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState(''); // État pour gérer le message
    const [inputMessage, setInputMessage] = useState(''); // État pour gérer la saisie de l'utilisateur

    const toggleCamera = () => {
        const newState = !isCameraOn;
        setIsCameraOn(newState);
        localTracks[1].setEnabled(newState); // Index 1 corresponds à la piste vidéo

        const cameraIcon = document.getElementById('camera-icon');
        if (cameraIcon) {
            cameraIcon.style.color = newState ? '#ff8316' : '#ccc';
        }
    };

    const toggleAudio = () => {
        const newState = !isAudioOn;
        setIsAudioOn(newState);
        localTracks[0].setEnabled(newState); // Index 0 corresponds à la piste audio

        // Mise à jour de l'icône du microphone
        const micIcon = document.getElementById('mic-icon');
        if (micIcon) {
            micIcon.style.color = newState ? '#ff8316' : '#ccc';
        }
    };

    const toggleScreenSharing = async () => {
        if (!isScreenSharing) {
            try {
                const screenTrack = await AgoraRTC.createScreenVideoTrack();
                setLocalTracks(prevTracks => [...prevTracks, screenTrack]);
                client.publish(screenTrack);
                setIsScreenSharing(true);
            } catch (error) {
                console.error('Error sharing screen:', error);
            }
        } else {
            // Stop screen sharing
            localTracks[2].stop();
            localTracks[2].close();
            setLocalTracks(prevTracks => prevTracks.filter(track => track.getType() !== 'video')); // Remove screen track
            setIsScreenSharing(false);
        }
    };

    const sendMessage = () => {
        if (inputMessage.trim() !== '') { // Utilisez inputMessage ici
            setChatMessages(prevMessages => [...prevMessages, { message: inputMessage }]); // Utilisez inputMessage ici
            setInputMessage(''); // Réinitialisez l'état de la saisie après l'envoi du message
        }
    };

    useEffect(() => {
        if (authData.user) {
            const handleUserJoined = async (user, mediaType) => {
                await client.subscribe(user, mediaType);

                if (mediaType === 'video') {
                    setUsers(previousUsers => [...previousUsers, user]);
                }

                if (mediaType === 'audio') {
                    user.audioTrack.play();
                }
            };

            const handleUserLeft = user => {
                setUsers(previousUsers =>
                    previousUsers.filter(u => u.uid !== user.uid)
                );
            };

            client.on('user-published', handleUserJoined);
            client.on('user-left', handleUserLeft);

            client
            .join(APP_ID, CHANNEL, TOKEN, null)
            .then(uid =>
                Promise.all([
                    AgoraRTC.createMicrophoneAndCameraTracks(),
                    uid,
                ])
            )
            .then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks;
                setLocalTracks(tracks);
                setUsers(previousUsers => [
                    ...previousUsers,
                    {
                        uid,
                        videoTrack,
                        audioTrack,
                    },
                ]);
                client.publish(tracks);
            });

            return () => {
                localTracks.forEach(track => {
                    track.stop();
                    track.close();
                });

                client.off('user-published', handleUserJoined);
                client.off('user-left', handleUserLeft);
                client.unpublish(localTracks).then(() => client.leave());
            };
        }
    }, [authData]);

    return (
        <div className="pt-24">
            {authData.user ? (
            <>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 500px)',
                    }}
                >
                    {users.map(user => (
                        <VideoPlayer key={user.uid} user={user} />
                    ))}
                </div>
                <div className="bottom-navbar">
                    <button onClick={toggleCamera}>
                        {isCameraOn ? <FaVideo color="#ff8316" size={22} id="camera-icon" /> : <FaVideoSlash color="#ff8316" size={21} id="camera-icon" />}
                    </button>
                    <button onClick={toggleAudio}>
                        {isAudioOn ? <FaMicrophone color="#ff8316" size={22} id="mic-icon" /> : <FaMicrophoneSlash color="#ff8316" size={21} id="mic-icon" />}
                    </button>
                    <button onClick={toggleScreenSharing}>
                        {isScreenSharing ? <FaDesktop color="#ff8316" size={22} /> : <FaDesktop color="#ff8316" size={21} />}
                    </button>
                </div>
            </>
            ) : (
            <div>Veuillez vous connecter pour activer la vidéo</div>
            )}
             <div className="sidebar" style={{ position: "fixed", top: 0, right: 0, bottom: 0, padding: "20px", paddingBottom: "100px", overflowY: "auto" }}>
          <h2 style={{ color: "orange" }}>Chat</h2>
          <div className="chat-window" style={{ maxHeight: "100px", overflowY: "auto" , paddingBottom: "10px" }}>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {chatMessages.map((msg, index) => (
                <li key={index}>{msg.message}</li>
              ))}
            </ul>
          </div>
          <div className="message-container" style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", paddingBottom: "10px" }}>
              <input
                type="text"
                placeholder="Saisissez votre message ici..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                style={{ flexGrow: 1, padding: "10px", marginRight: "10px", borderRadius: "20px", border: "none", backgroundColor: "#f0f0f0", outline: "none" }}
              />
              <IconButton
                onClick={sendMessage}
                style={{ padding: "8px", backgroundColor: "orange", color: "#fff", borderRadius: "50%", height: "32px", width: "32px", marginRight: "20px" }}
              >
                <SendIcon />
              </IconButton>
          </div>
        </div>
        </div>
    );
};

