import React from 'react';
import { useEffect, useRef } from 'react';
import * as faceapi from "face-api.js";
function Video() {
    const videoRef = useRef();
    const canvasRef = useRef();
    useEffect(() => {
        startVideo();
      }, []);
      const startVideo = () => {
         navigator.mediaDevices.getUserMedia({ video: true    })
         .then((currentStream) => {
                 videoRef.current.srcObject = currentStream;
              }).catch((err) => {
                 console.error(err)
         });
      }
      useEffect(() => {
        startVideo();
        videoRef && loadModels();
     }, []);
     const loadModels = () => {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]).then(() => {
         faceDetection();
        })
     };
     const faceDetection = async () => {
        setInterval(async() => {
        const detections = await faceapi.detectAllFaces
              (videoRef.current,new faceapi.TinyFaceDetectorOptions())
               .withFaceLandmarks()
               .withFaceExpressions();
     canvasRef.current.innerHtml = faceapi.createCanvasFromMedia
                                   (videoRef.current);
     faceapi.matchDimensions(canvasRef.current, {
       width: 940,
       height: 650,
     })
     const resized = faceapi.resizeResults(detections, {
       width: 940,
       height: 650,
     });
     // to draw the detection onto the detected face i.e the box
     faceapi.draw.drawDetections(canvasRef.current, resized);
     //to draw the the points onto the detected face
     faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
     //to analyze and output the current expression by the detected face
     faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
     }, 1000);
     };
    
    
  return (
                <div className="min-h-screen flex justify-center items-center flex-col space-y-6">
                    <h1 className="text-3xl font-bold">AI FACE DETECTION</h1>
                    <div className='flex items-center'>
                        <video className='w-full' crossOrigin='anonymous' ref={videoRef} autoPlay />
                    </div>
                    <canvas className='absolute top-20' ref={canvasRef} width="940" height="650" />
                </div>

  );
}

export default Video;