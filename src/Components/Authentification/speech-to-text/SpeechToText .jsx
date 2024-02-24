import React, { useState } from "react";

const SpeechToTextIcon = ({ onStartRecording }) => {
  return (
    <div className="speech-to-text-icon" onClick={onStartRecording}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-6h2v-4h-2v4z"/>
      </svg>
    </div>
  );
};

const SpeechToText = ({ onTranscriptChange,language }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startRecording = () => {
    setIsRecording(true);
    setTranscript(""); 
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      onTranscriptChange(speechResult);
      setIsRecording(false);
    };
    recognition.start();
  };

  return (
    <div>
      <SpeechToTextIcon onStartRecording={startRecording} />
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechToText;
