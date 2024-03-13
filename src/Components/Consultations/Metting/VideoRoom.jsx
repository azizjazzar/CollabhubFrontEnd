import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPaperPlane, FaDesktop } from 'react-icons/fa';
import { VideoPlayer } from './VideoPlayer';
import { useAuth } from '@/pages/authContext';
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from '@material-ui/core';
import iconTwo from '/img/iconmessage.jpg';
import { FaVolumeUp } from 'react-icons/fa';

const APP_ID = "3e022011a0274ad2938a1a9aaf565cf0";
const urlParams = new URLSearchParams(window.location.search);
const newToken = urlParams.get('token');
const TOKEN = decodeURIComponent(newToken);
const CHANNEL = "collaab";
const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});
const MAX_CHARACTERS_DISPLAYED = 200;

export const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [localTracks, setLocalTracks] = useState([]);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const { authData, setAuthUserData } = useAuth();
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [transcribedText, setTranscribedText] = useState('');
    const [listeningText, setListeningText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${hours}:${formattedMinutes}`;
   

    useEffect(() => {
        let recognition = null;

        const startSpeechToText = () => {
            recognition = new window.webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = true;
        
            recognition.onresult = (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                const currentTime = new Date().toLocaleTimeString();
                const transcriptionWithDateTime = `${currentTime}: ${transcript}`;
                setListeningText(prevText => prevText + transcript);
                setTranscribedText(prevTranscription => prevTranscription + transcriptionWithDateTime + ' '); 
            };
        
            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                recognition.stop();
            };
        
            recognition.onend = () => {
                if (isListening && isAudioOn) { 
                    recognition.start(); 
                }
            };
        
            recognition.start();
        };

        const stopSpeechToText = () => {
            localStorage.setItem('transcribedText', transcribedText);
            if (recognition) {
                recognition.stop();
            }
        };

        if (isAudioOn) {
            startSpeechToText();
        } else {
            stopSpeechToText();
        }

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, [isAudioOn]);



    const toggleCamera = () => {
        const newState = !isCameraOn;
        setIsCameraOn(newState);
    };

    const toggleAudio = () => {
        const newState = !isAudioOn;
        setIsAudioOn(newState);
    
        if (localTracks[0]) {
            localTracks[0].setEnabled(newState);
        }
    
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

    const handleShowMore = () => {
        setShowMore(true);
    };

    const handleShowLess = () => {
        setShowMore(false);
    };


    useEffect(() => {
        const joinChannel = async () => {
            if (authData.user) {
                let uid = localStorage.getItem('userUID');
                if (!uid) {
                    uid = authData.user.id || Math.floor(Math.random() * 100000).toString();
                    localStorage.setItem('userUID', uid); 
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

                client.on('user-published', handleUserJoined);
                client.on('user-left', handleUserLeft);

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
        <div className="fixed w-full h-full overflow-hidden">
            {authData.user ? (
                <>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 630px)',
                            gridGap: '8px',
                            justifyItems: 'center',
                        }}
                    >
                        {users.map(user => (
                                isCameraOn ? (
                                    <VideoPlayer key={user.uid} user={user} />
                                ) : (
                                    <div className='mt-52 mr-20'>
                                        <img
                                            src={`https://colabhub.onrender.com/images/${authData.user?.picture}`}
                                            alt={`User ${user.uid}`}
                                            style={{ borderRadius: '50%', width: '200px', height: '200px' }}  
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
    <div className="sidebar" style={{ position: "fixed", top: 0, right: 0, bottom: 0, padding: "20px", paddingBottom: "100px", overflowY: "hidden" }}>
        <div className="chat-image" style={{ marginTop: "7rem" }}>
            <img src={iconTwo} alt="Chat Image" style={{ width: "70%", height: "auto" }} />
        </div>
        <div className="transcribed-text" style={{ marginTop: "1rem", marginBottom: "0.1rem", maxHeight: "300px", overflowY: "auto" }}>
            {transcribedText && (
                <div className="flex items-start gap-2.5">
                   <img
    className="w-8 h-8 rounded-full"
    src={`https://colabhub.onrender.com/images/${authData.user?.picture}`}
    alt={`User ${authData.user?.name}`}
/>

                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{authData.user?.nom} {authData.user?.prenom}</span>

                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formattedTime}</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{transcribedText}</p>
                    </div>
                </div>
            )}
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



