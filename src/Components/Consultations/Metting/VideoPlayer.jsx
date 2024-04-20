import React, { useEffect, useRef } from 'react';
import '@/widgets/assets/meeting.css'; // Import du fichier CSS
import { useAuth } from '@/pages/authContext';
import * as faceapi from "face-api.js";
export const VideoPlayer = ({ user }) => {
 
  const videoRef = useRef();
  const canvasRef = useRef();
  const { authData, setAuthUserData } = useAuth();
  const largeurEcran = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
  useEffect(() => {
    user.videoTrack.play(videoRef.current);
  }, [user.videoTrack]);


  useEffect(() => {

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
    <div className='flex pb-[2%] w-full' style={{ width: '100%', height: '95vh' }}>
      <div className={`border  mb-12 ${largeurEcran > 1320 ? 'w-[600px]' : 'sm:w-1/2 md:w-[200px] lg:w-[300px] 2xl:w-[500px]'}`} ref={ref} style={{ height: '100%' }}></div>
    </div>
  );
};
