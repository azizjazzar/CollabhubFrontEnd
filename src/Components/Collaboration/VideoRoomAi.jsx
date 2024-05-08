
import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPaperPlane, FaDesktop, FaPhone, FaHandPaper } from 'react-icons/fa';
import { VideoPlayer } from '../Collaboration/VideoPlayer';
import { useAuth } from '@/pages/authContext';
import SendIcon from "@mui/icons-material/Send";  // Updated import path
import { IconButton } from '@mui/material';  // Updated import path
import iconTwo from '/img/iconmessage.jpg';
import { FaVolumeUp } from 'react-icons/fa';
import Statistiques from '@/Services/statistiques/Statistiques';
import EndMeetingPage from "@/Components/Consultations/Metting/IA/EndMeetingPage";
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '@/Services/Authentification/AuthentificationService';


const APP_ID = "67a5503c4b134d80baec1767141115d3";
const TOKEN = "007eJxTYNh0Yt7PkHNHnrCz2PesujT7qrvlYaOtrUKCmaXnk38+X3JdgcHMPNHU1MA42STJ0NgkxcIgKTE12dDczNzQxNDQ0DTF+J6FdVpDICPDyS4VZkYGRgYWIAbxmcAkM5hkAZNsDMn5OTmJSQwMAIf7JAU=";
const CHANNEL = "collab";
const StatistiquesService = new Statistiques();
const authuser = new AuthenticationService();
const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});
const MAX_CHARACTERS_DISPLAYED = 200;

export function VideoRoomAi() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [handRaised, setHandRaised] = useState(false);
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
    const [checkuser, setcheckuser] = useState(true)
    const meeting = {
        "clientAID": "",
        "clientBID": "",
        "clientA": "",
        "clientB": "",
        "responseClientA": "",
        "responseClientB": "",
        "dateEnrg": "",
        "token": "",
        "channel": "",
        "status": "",
    };
    useEffect(() => {
        const fetchData = async () => {
            const meetingUpdate = await StatistiquesService.getMetting(TOKEN, CHANNEL);
            if (meetingUpdate.clientAID != authData.user._id && meetingUpdate.clientBID != authData.user._id) {
                setcheckuser(false)
            }
        };

        fetchData();
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

    const hangUp = async () => {
        try {
            const meetingUpdate = await StatistiquesService.getMetting(TOKEN, CHANNEL);

            if (meetingUpdate.clientA === "in Progress ..." && authData.user._id === meetingUpdate.clientAID) {
                meetingUpdate.clientA = transcribedText;
                const result = await StatistiquesService.geminiMoodPrecise(meetingUpdate.clientA);
                meetingUpdate.responseClientA = result;
                if (!(meetingUpdate.clientB == "in Progress ..."))
                    meetingUpdate.status = await StatistiquesService.gemini2Client(`Client A: ${meetingUpdate.clientA} \n Client B: ${meetingUpdate.clientB}`);
                await StatistiquesService.updateStatistiqueById(meetingUpdate._id, meetingUpdate);
            } else if (meetingUpdate.clientB === "in Progress ..." && authData.user._id === meetingUpdate.clientBID) {

                meetingUpdate.clientB = transcribedText;
                const result = await StatistiquesService.geminiMoodPrecise(meetingUpdate.clientB);
                meetingUpdate.responseClientB = result;
                if (!(meetingUpdate.clientA == "in Progress ..."))
                    meetingUpdate.status = await StatistiquesService.gemini2Client(`Client A: ${meetingUpdate.clientA} \n Client B: ${meetingUpdate.clientB}`);
                await StatistiquesService.updateStatistiqueById(meetingUpdate._id, meetingUpdate);

                // Gestion du comportement en fonction de la réponse de gemini
                if (meetingUpdate.status === "declined") {
                    const userA = await authuser.getUserById(meetingUpdate.clientAID);
                    if (userA.rate >= 0)
                        await authuser.updatebyid(userA._id, { rate: userA.rate - 0.75 });
                } else if (meetingUpdate.status === "inappropriate") {
                    await authuser.updatebyid(userA._id, { rate: 0 });
                } else if (meetingUpdate.status === "confirmed") {
                    await authuser.updatebyid(userA._id, { rate: userA.rate + 0.50 });
                }
            }

            // Arrêt de la reconnaissance de la parole si elle est en cours
            if (recognition) {
                recognition.stop();
            }
        } catch (error) {
            console.error('Error in stopSpeechToText:', error);
        }
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

        const stopSpeechToText = async () => {
            try {
                const meetingUpdate = await StatistiquesService.getMetting(TOKEN, CHANNEL);

                if (meetingUpdate.clientA === "in Progress ..." && authData.user._id === meetingUpdate.clientAID) {
                    meetingUpdate.clientA = transcribedText;
                    const result = await StatistiquesService.geminiMoodPrecise(meetingUpdate.clientA);
                    meetingUpdate.responseClientA = result;
                    if (!(meetingUpdate.clientB == "in Progress ..."))
                        meetingUpdate.status = await StatistiquesService.gemini2Client(`Client A: ${meetingUpdate.clientA} \n Client B: ${meetingUpdate.clientB}`);
                    await StatistiquesService.updateStatistiqueById(meetingUpdate._id, meetingUpdate);
                } else if (meetingUpdate.clientB === "in Progress ..." && authData.user._id === meetingUpdate.clientBID) {

                    meetingUpdate.clientB = transcribedText;
                    const result = await StatistiquesService.geminiMoodPrecise(meetingUpdate.clientB);
                    meetingUpdate.responseClientB = result;
                    if (!(meetingUpdate.clientA == "in Progress ..."))
                        meetingUpdate.status = await StatistiquesService.gemini2Client(`Client A: ${meetingUpdate.clientA} \n Client B: ${meetingUpdate.clientB}`);
                    await StatistiquesService.updateStatistiqueById(meetingUpdate._id, meetingUpdate);

                    // Gestion du comportement en fonction de la réponse de gemini
                    if (meetingUpdate.status === "declined") {
                        const userA = await authuser.getUserById(meetingUpdate.clientAID);
                        if (userA.rate >= 0)
                            await authuser.updatebyid(userA._id, { rate: userA.rate - 0.75 });
                    } else if (meetingUpdate.status === "inappropriate") {
                        await authuser.updatebyid(userA._id, { rate: 0 });
                    } else if (meetingUpdate.status === "confirmed") {
                        await authuser.updatebyid(userA._id, { rate: userA.rate + 0.50 });
                    }
                }

                // Arrêt de la reconnaissance de la parole si elle est en cours
                if (recognition) {
                    recognition.stop();
                }
            } catch (error) {
                console.error('Error in stopSpeechToText:', error);
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
        <>
            {checkuser ? (
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
                                   <VideoPlayer key={user.uid} user={user} emotions={false} />
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
                           </div>
                       </>
                   ) : (
                       <div>Please log in to activate the video</div>
                   )}
   
                   <div className="sidebar" style={{ position: "fixed", top: 0, right: 0, bottom: 0, padding: "20px", paddingBottom: "100px", overflowY: "hidden" }}>
   
                       <div className="chat-image" style={{ marginTop: "7rem", backgroundColor: "#F1F6F9", padding: "10px", borderRadius: "8px" }}>
                           <div style={{ display: 'flex', alignItems: 'center' }}>
                               <div style={{ backgroundColor: 'red', width: '12px', height: '12px', borderRadius: '60%', marginRight: '5px' }}></div>
                               {/* Remplacer le texte par l'icône */}
                               <p style={{ color: 'black', fontFamily: 'VotrePoliceProfessionnelle' }}>{formatTime(elapsedTime)}</p>
                           </div>
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
   
   
   
   
                       <div className="message-container" style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", paddingBottom: "10px" }}>
                           <input
                               type="text"
                               placeholder="Type your message here..."
                               value={inputMessage}
                               onChange={(e) => setInputMessage(e.target.value)}
                               style={{ flexGrow: 1, padding: "10px", marginRight: "10px", borderRadius: "20px", border: "none", backgroundColor: "#f0f0f0", outline: "none" }}
                           />
                           <IconButton
   
                               style={{ padding: "8px", backgroundColor: "#3498DB", color: "#fff", borderRadius: "50%", height: "32px", width: "32px", marginRight: "20px" }}
                           >
                               <SendIcon />
                           </IconButton>
                       </div>
                   </div>
   
   
   
   
   
               </div>
            ) : (
            <div className='pt-[490px] text-center text-red-500 text-4xl'>You are not invited to this meeting</div>
            )}
        </>
    );
};

export default VideoRoomAi ;
