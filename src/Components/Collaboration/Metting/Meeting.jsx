import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

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

  return (
    <div className="pt-24">
      <div>
        {isCameraOn ? (
          <Webcam
            audio={isMicroOn}
            ref={webcamRef}
            mirrored={true}
          />
        ) : (
          <div>Webcam désactivée</div>
        )}
        <button onClick={toggleCamera}>{isCameraOn ? 'Désactiver la webcam' : 'Activer la webcam'}</button>
        <button onClick={toggleMicro}>{isMicroOn ? 'Désactiver le micro' : 'Activer le micro'}</button>
      </div>
    </div>
  );
}

export default Meeting;
