import React, { useState, useEffect } from "react";
import TextToSpeech from "./text-to-speech/TextToSpeech";
import SpeechToText from "./speech-to-text/SpeechToText ";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Alan() {
  const [transcript, setTranscript] = useState("");
  const navigate = useNavigate();
  const [speech, setSpeech] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [services, setServices] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [titleService, setTitles] = useState(false);
  const [newsPromptSpoken, setNewsPromptSpoken] = useState(false);

  const location = useLocation();

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript.toUpperCase());
    setSpeech(null);
  };

  useEffect(() => {
    const storedConsultations = localStorage.getItem("consultations");
    if (storedConsultations) {
      setConsultations(JSON.parse(storedConsultations));
    }
  }, [location.pathname]);

  useEffect(() => {
    const storedServices = localStorage.getItem("services");
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!speech) {
      if (transcript === "GO TO SERVICE") {
        setSpeech({
          text: "Yes, going right now.",
          language: "en-US",
          voiceIndex: 5
        });
        setTimeout(() => {
          navigate("/buyProject");
          setTimeout(() => {
            setSpeech({
              text: "Do you want me to read the titles for you?",
              language: "en-US",
              voiceIndex: 5
            });
            setNewsPromptSpoken(true);
          }, 1000);
        }, 2500);
      } else if (transcript === "GO TO CONSULTATION") {
        setSpeech({
          text: "Yes, going right now.",
          language: "en-US",
          voiceIndex: 5
        });
        setTimeout(() => {
          navigate("/do-a-quick-consultation");
        }, 2500);
      }
    }
  }, [transcript, speech, navigate]);
  
  useEffect(() => {
    if (speech && transcript === "STOP") {
      setSpeech(null); // Arrêter la lecture définitivement
      setScroll(0); // Arrêter le défilement automatique
    } else if (!speech) {
      if (newsPromptSpoken && (transcript === "YES." || transcript === "YES")) {
        setTitles(true);
        setNewsPromptSpoken(false);
        setScroll(300);
      } else if (newsPromptSpoken && (transcript === "NO." || transcript === "NO")) {
        setSpeech({
          text: "As you like, do you need something else?",
          language: "en-US",
          voiceIndex: 5
        });
        setNewsPromptSpoken(false);
      }
    }
  }, [transcript, newsPromptSpoken, speech]);
  
  
  

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
          if (index % 4 === 0 && index !== 0 ) 
            setScroll((prevScroll) => prevScroll + 550); // Adjust the scroll position based on your needs
            setSpeech({
              text: service.title,
              language: "en-US",
              voiceIndex: 5,
            });
        }, delay);
  
        delay += 3500;
      });
  
      setTitles(false);

    }
  }, [titleService, services]);
  useEffect(() => {
    const normalizedTranscript = transcript.trim().toLowerCase();
    switch (normalizedTranscript) {
      case "who are you":
        setSpeech({
          text: "I am Alan, a computer program created by students. Devoid of personal experiences or identity, my purpose is to assist and provide information to the best of my abilities. How may I assist you today",
          language: "en-US",
          voiceIndex: 5,
        });
        break;
        case "help":
        setSpeech({
          text: "Hello, I'm Alan, a computer program. Here are some functionalities that I can provide, I can read text and navigate into pages for Exemple say go to Service.",
          language: "en-US",
          voiceIndex: 5,
        });
        break;
        
        case "thank you":
          setSpeech({
            text: "You are welcome",
            language: "en-US",
            voiceIndex: 5,
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