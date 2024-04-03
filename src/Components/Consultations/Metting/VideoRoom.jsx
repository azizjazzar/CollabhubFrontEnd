import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPaperPlane, FaDesktop } from 'react-icons/fa';
import { VideoPlayer } from './VideoPlayer';
import { useAuth } from '@/pages/authContext';
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from '@material-ui/core';
import iconTwo from '/img/iconmessage.jpg';
import ChatRoom from './chatRoom';

const APP_ID = "67a5503c4b134d80baec1767141115d3";
const TOKEN = "007eJxTYDj+deK9ll8nNDk8LASyqqZ77D4VsW713rL8TcvPixW8i6tQYDAzTzQ1NTBONkkyNDZJsTBISkxNNjQ3Mzc0MTQ0NE0xLtzJk9YQyMjw0SqXiZEBAkF8Nobk/JycxCQGBgD3ryDt";
const CHANNEL = "collab";

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});

export const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const { authData, setAuthUserData } = useAuth();
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const toggleCamera = () => {
        const newState = !isCameraOn;
        setIsCameraOn(newState);

        if (newState) {
            window.location.reload();
        } else {
            localTracks[1].setEnabled(false).catch(error => console.error('Error disabling the video track:', error));
        }
    };

    const toggleAudio = () => {
        const newState = !isAudioOn;
        setIsAudioOn(newState);
        localTracks[0].setEnabled(newState);

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
            const screenTrackIndex = localTracks.findIndex(track => track.getType() === 'video');
            if (screenTrackIndex !== -1) {
                localTracks[screenTrackIndex].stop();
                localTracks[screenTrackIndex].close();
                setLocalTracks(prevTracks => prevTracks.filter((_, index) => index !== screenTrackIndex));
                setIsScreenSharing(false);
            }
        }
    };

    const toggleChat = () => {
        setIsChatOpen(prevState => !prevState);
    };

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            setChatMessages(prevMessages => [...prevMessages, { message: inputMessage }]);
            setInputMessage('');
        }
    };

    useEffect(() => {
        const joinChannel = async () => {
            if (authData.user) {
                // Essayer de récupérer l'UID du localStorage ou générer un nouvel UID.
                let uid = localStorage.getItem('userUID');
                if (!uid) {
                    uid = authData.user.id || Math.floor(Math.random() * 100000).toString();
                    localStorage.setItem('userUID', uid); // Stocker l'UID pour les futures connexions.
                }

                const handleUserJoined = async (user, mediaType) => {
                    await client.subscribe(user, mediaType);

                    if (mediaType === 'video') {
                        setUsers(previousUsers => [...previousUsers, user]);
                        setAuthUserData({ ...authData, userMeeting: user });
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

                // Attacher les gestionnaires d'événements.
                client.on('user-published', handleUserJoined);
                client.on('user-left', handleUserLeft);

                // Rejoindre le canal avec l'UID spécifié.
                await client.join(APP_ID, CHANNEL, TOKEN, uid)
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

                // Nettoyage à la désinscription.
                return () => {
                    localTracks.forEach(track => {
                        track.stop();
                        track.close();
                    });

                    client.off('user-published', handleUserJoined);
                    client.off('user-left', handleUserLeft);
                    client.leave();
                };
            }
        };

        joinChannel();
    }, [authData.user]);

    return (
        <div className="pt-24 fixed">
            {authData.user ? (
                <>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 700px)',
                            gridGap: '10px',
                            justifyItems: 'center',
                        }}
                    >
                        {users.map(user => (
                            isCameraOn ? (
                                <VideoPlayer key={user.uid} user={user} />
                            ) : (
                                <div className='mt-36'>
                                    <img
                                        src={`https://colabhub.onrender.com/images/${authData.user?.picture}`}
                                        alt={`User ${user.uid}`}
                                        style={{ borderRadius: '50%', width: '200px', height: '200px' }}  // Style pour rendre l'image circulaire
                                    />
                                </div>
                            )
                        ))}
                    </div>

                    <div className="bottom-navbar">
                        <button onClick={toggleCamera}>
                            {isCameraOn ? (
                                <>
                                    <FaVideo color="#ffff" size={22} id="camera-icon" />
                                    <div style={{ color: '#fff', fontSize: '13px', textAlign: 'center', paddingRight: '5px' }}>Turn off camera</div>
                                </>
                            ) : (
                                <>
                                    <FaVideoSlash color="#ffff" size={21} id="camera-icon" />
                                    <div style={{ color: '#fff', fontSize: '13px', textAlign: 'center', paddingRight: '5px' }}>Turn on camera</div>
                                    <div style={{ color: '#fff', fontSize: '13px', textAlign: 'center', paddingRight: '5px' }}>Camera is off</div>
                                </>
                            )}
                        </button>
                        <button onClick={toggleAudio}>
                            {isAudioOn ? (
                                <>
                                    <FaMicrophone color="#ffff" size={22} id="mic-icon" />
                                    <div style={{ color: '#fff', fontSize: '13px', textAlign: 'center', paddingRight: '5px' }}>Mute microphone</div>
                                </>
                            ) : (
                                <>
                                    <FaMicrophoneSlash color="#ffff" size={21} id="mic-icon" />
                                    <div style={{ color: '#fff', fontSize: '13px', textAlign: 'center', paddingRight: '5px' }}>Unmute microphone</div>
                                </>
                            )}
                        </button>
                        <button onClick={toggleScreenSharing}>
                            {isScreenSharing ? (
                                <>
                                    <FaDesktop color="#ffff" size={22} />
                                    <div style={{ color: '#fff', fontSize: '13px', textAlign: 'center', paddingRight: '5px' }}>Stop screen sharing</div>
                                </>
                            ) : (
                                <>
                                    <FaDesktop color="#ffff" size={21} />
                                    <div style={{ color: '#fff', fontSize: '13px', textAlign: 'center', paddingRight: '20px' }}>Start screen sharing</div>
                                </>
                            )}
                        </button>
                        <button onClick={toggleChat}>
                            <FaPaperPlane color="#ffff" size={22} />
                            <div style={{ color: '#fff', fontSize: '13px', textAlign: 'center', paddingRight: '5px' }}>Open/close chat</div>
                        </button>
                    </div>
                </>
            ) : (
                <div>Veuillez vous connecter pour activer la vidéo</div>
            )}
            {isChatOpen && (
                <div className="sidebar" style={{ position: "fixed", top: 0, right: 0, bottom: 0, padding: "20px", paddingBottom: "100px", overflowY: "auto" }}>
                    <h5 style={{ color: "#3498DB", position: "absolute", top: "17%", left: "10%", transform: "translate(-50%, -50%)", fontSize: "1.2em", fontWeight: "bold" }}>
                        Chat
                    </h5>

                    <div className="chat-image" style={{ marginTop: "170px" }}>
                        <img src={iconTwo} alt="Chat Image" style={{ width: "100%", height: "auto" }} />
                    </div>

                    <div className="chat-window" style={{ maxHeight: "100px", overflowY: "auto", paddingBottom: "10px" }}>
                        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                            {chatMessages.map((msg, index) => (
                                <li key={index}>{msg.message}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="message-container" style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", paddingBottom: "10px" }}>
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            style={{ flexGrow: 1, padding: "10px", marginRight: "10px", borderRadius: "20px", border: "none", backgroundColor: "#f0f0f0", outline: "none" }}
                        />
                        <IconButton
                            onClick={sendMessage}
                            style={{ padding: "8px", backgroundColor: "#3498DB", color: "#fff", borderRadius: "50%", height: "32px", width: "32px", marginRight: "20px" }}
                        >
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            )}
        </div>
    );
};
