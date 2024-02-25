import React, { useState, useEffect } from "react";
import TextToSpeech from "./text-to-speech/TextToSpeech";
import SpeechToText from "./speech-to-text/SpeechToText ";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/authContext';

export default function Alan() {
  const [transcript, setTranscript] = useState("");
  const navigate = useNavigate();
  const [speech, setSpeech] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [services, setServices] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [titleService, setTitles] = useState(false);
  const [newsPromptSpoken, setNewsPromptSpoken] = useState(false);
  const [actor, setActor] = useState(5);
  const location = useLocation();
  const { authData, setAuthUserData } = useAuth();
  const [logoutSure, setLogoutSure ] = useState(false);

  const logout = () => {
    setAuthUserData({
      user: null,
      accessToken: null,
      refreshToken: null,
    });

    localStorage.setItem('authData', JSON.stringify({
      user: null,
      accessToken: null,
      refreshToken: null,
    }));
  };

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript.toUpperCase());
    setSpeech(null);
  };

  const handleLogout = () => {
  
    setAuthUserData({
      user: null,
      accessToken: null,
      refreshToken: null,
    });

    localStorage.setItem('authData', JSON.stringify({
      user: null,
      accessToken: null,
      refreshToken: null,
    }));
    navigate("/");
  };

  useEffect(() => {
    const storedConsultations = localStorage.getItem("consultations");
    if (storedConsultations) {
      setConsultations(JSON.parse(storedConsultations));
    }

    const storedServices = localStorage.getItem("services");
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!speech) {
      let action = null;

      if (transcript.includes("GO TO SERVICE")) {
        action = {
          text: "Yes, going right now.",
          language: "en-US",
          voiceIndex: actor
        };
        const destination = transcript.includes("GO TO SERVICES") ? "/buyProject" : "/buyProject";
        setTimeout(() => {
          navigate(destination);
          setTimeout(() => {
            setSpeech({
              text: "Do you want me to read the titles for you?",
              language: "en-US",
              voiceIndex: actor
            });
            setNewsPromptSpoken(true);
          }, 1000);
        }, 2500);
      } else if (transcript.includes("GO TO CONSULTATION")) {
        action = {
          text: "Yes, going right now.",
          language: "en-US",
          voiceIndex: actor
        };
        setTimeout(() => {
          navigate("/do-a-quick-consultation");
        }, 2500);
      } else if (transcript.includes("LOG OUT") || transcript.includes("LOOK OUT.")) {
        if (authData.user)
        {
          action = {
            text: "Are you sure you want to log out.",
            language: "en-US",
            voiceIndex: actor
          };
          setLogoutSure(true)
        }
        else {
          setSpeech({
            text: "You are already disconnected",
            language: "en-US",
            voiceIndex: actor
          });
        }
      }

      if (action) {
        setSpeech(action);
      }
    }
  }, [transcript, speech, navigate]);

  useEffect(() => {
    console.log(logoutSure)
    if (speech && transcript === "STOP") {
      setSpeech(null);
      setScroll(0);
    } else if (!speech) {
      if (newsPromptSpoken && (transcript === "YES." || transcript === "YES" || transcript === "YES, PLEASE.")) {
        setTitles(true);
        setNewsPromptSpoken(false);
        setScroll(300);
      } else if (newsPromptSpoken && (transcript === "NO." || transcript === "NO" ||  transcript === "NO, PLEASE.")) {
        setSpeech({
          text: "As you like, do you need something else?",
          language: "en-US",
          voiceIndex: actor
        });
        setNewsPromptSpoken(false);
      } else if (logoutSure && (transcript === "YES." || transcript === "YES" || transcript === "YES,PLEASE")) {
   
          setSpeech({
            text: "You've been disconnected, see you later",
            language: "en-US",
            voiceIndex: actor
          });
          handleLogout();
          setLogoutSure(false);
        
       

      } else if (logoutSure && (transcript === "NO." || transcript === "NO" ||  transcript === "NO, PLEASE.")) {
        setSpeech({
          text: "Deconnexion failed",
          language: "en-US",
          voiceIndex: actor
        });
        setLogoutSure(false);
      }
    }
  }, [transcript, newsPromptSpoken, speech, logoutSure]);
  
  useEffect(() => {
    window.scrollTo({
      top: scroll,
      behavior: "smooth"
    });
  }, [scroll]);

  useEffect(() => {
    if (titleService) {
      let delay = 0;
      services.forEach((service, index) => {
        setTimeout(() => {
          if (index % 4 === 0 && index !== 0)
            setScroll((prevScroll) => prevScroll + 550);
          setSpeech({
            text: service.title,
            language: "en-US",
            voiceIndex: actor,
          });
        }, delay);

        delay += 3800;
      });

      setTitles(false);
    }
  }, [titleService, services]);

  useEffect(() => {
    const normalizedTranscript = transcript.trim().toLowerCase();
    switch (normalizedTranscript) {
      case "who are you?":
      case "who are you":
        setSpeech({
          text: "I am Alan, a computer program created by students. Devoid of personal experiences or identity, my purpose is to assist and provide information to the best of my abilities. How may I assist you today",
          language: "en-US",
          voiceIndex: actor,
        });
        break;
      case "hello.":
      case "help.":
      case "help":
        setSpeech({
          text: "Hello, I'm Alan, a computer program. Here are some functionalities that I can provide, I can read text and navigate into pages",
          language: "en-US",
          voiceIndex: actor,
        });
        break;
      case "thank you.":
      case "thank you":
        setSpeech({
          text: "You are welcome",
          language: "en-US",
          voiceIndex: actor,
        });
        break;
 
    }
  }, [transcript]);

  return (
    <section className="pt-24 w-full">
      <div>
        <SpeechToText onTranscriptChange={handleTranscriptChange} language={"en-US"} />
        {speech && <TextToSpeech text={speech.text} language={speech.language} voiceIndex={speech.voiceIndex} />}
      </div>
    </section>
  );
}