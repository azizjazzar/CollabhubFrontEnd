import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhone, FaHandPaper, FaEllipsisV } from 'react-icons/fa';
import { VideoPlayer } from './VideoPlayer';
import { useAuth } from '@/pages/authContext';
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from '@material-ui/core';
import iconTwo from '/img/iconmessage.jpg';
import { FaVolumeUp } from 'react-icons/fa';
import Statistiques from '@/Services/statistiques/Statistiques';
import EndMeetingPage from "@/Components/Consultations/Metting/IA/EndMeetingPage";
import { useNavigate } from 'react-router-dom';

const APP_ID = "36067b6e79984e48828b420ceeea0b5c";
const urlParams = new URLSearchParams(window.location.search);
const TOKEN = decodeURIComponent(urlParams.get('token'));
const CHANNEL = decodeURIComponent(urlParams.get('channel'));
const StatistiquesService = new Statistiques();

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});
const MAX_CHARACTERS_DISPLAYED = 200;

export const VideoRoom = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [handRaised, setHandRaised] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
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
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);

    useEffect(() => {
        const startTimer = () => {
            setTimerInterval(setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000));
        };

        startTimer();

        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, []);

    const hangUp = () => {
        localTracks.forEach(track => {
            track.stop();
            track.close();
        });

        client.leave();
        console.log("Meeting duration:", elapsedTime);
        navigate('/end-meeting');
    };

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

    const toggleHandRaise = () => {
        const newState = !handRaised;
        setHandRaised(newState);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleRecord = () => {
        console.log("Recording functionality not implemented.");
    };

    const handleInfo = () => {
        alert("Info: This is a video conferencing app using Agora.");
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
                    setUsers(previousUsers => previousUsers.filter(u => u.uid !== user.uid));
                };

                client.on('user-published', handleUserJoined);
                client.on('user-left', handleUserLeft);

                await client.join(APP_ID, CHANNEL, TOKEN, uid)
                    .then(uid => Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]))
                    .then(([tracks, UID]) => {
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

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="fixed w-full h-full overflow-hidden">
            {authData.user ? (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 600px)',
                        gridGap: '8px',
                        justifyItems: 'center',
                    }}>
                        {users.map(user => (
                            <VideoPlayer key={user.uid} user={user} />
                        ))}
                    </div>
                    <div className="bottom-navbar">
                        {/* Buttons for camera, microphone, etc. */}
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
                        <button onClick={toggleHandRaise}>
                            {handRaised ? (
                                <>
                                    <FaHandPaper color="#ffff" size={22} />
                                    <div style={{ color: '#fff', fontSize: '13px', textAlign: 'center' }}>Lower hand</div>
                                </>
                            ) : (
                                <>
                                    <FaHandPaper color="#ccc" size={22} />
                                    <div style={{ color: '#ccc', fontSize: '13px', textAlign: 'center' }}>Raise hand</div>
                                </>
                            )}
                        </button>
                        <button onClick={hangUp} className="rounded-full bg-red-500 p-2 flex items-center justify-center w-10 h-10">
                            <FaPhone color="#ffffff" size={22} />
                        </button>
                        {/* Three-dot menu button */}
                       
<button onClick={toggleMenu} className="p-2" style={{ position: 'relative' }}>
    <FaEllipsisV color="#ffffff" size={22} />
    {showMenu && (
        <div style={{
            position: 'absolute',
            right: 0,
            bottom: '100%', // Position it above the button
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            width: '200px' // Set a fixed width or adjust as necessary
        }}>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                <li><button onClick={handleRecord} style={{ display: 'block', width: '100%', padding: '8px' }}>Start/Stop Recording</button></li>
                <li><button onClick={handleInfo} style={{ display: 'block', width: '100%', padding: '8px' }}>Meeting Info</button></li>
            </ul>
        </div>
    )}
</button>

                        {showMenu && (
                            <div style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: '8px', padding: '10px', marginTop: '5px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li>
                                        <button onClick={handleRecord} style={{ all: 'unset', cursor: 'pointer' }}>
                                            Start/Stop Recording
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleInfo} style={{ all: 'unset', cursor: 'pointer' }}>
                                            Meeting Info
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div>Please log in to activate the video</div>
            )}
        </div>
    );
};

export default VideoRoom;