import React, { useEffect, useRef } from 'react';
import '@/widgets/assets/meeting.css'; // Import du fichier CSS
import { useAuth } from '@/pages/authContext';
import * as faceapi from "face-api.js";
export const VideoPlayer = ({ user , emotions}) => {
 
  const videoRef = useRef();
  const canvasRef = useRef();
  const { authData, setAuthUserData } = useAuth();
  const largeurEcran = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      // Initialisation des compteurs pour chaque expression
      let happyCount = 0;
      let angryCount = 0;
      let sadCount = 0;
      let neutralCount =0 ; 

  useEffect(() => {
    user.videoTrack.play(videoRef.current);
  }, [user.videoTrack]);


  useEffect(() => {

    videoRef
 }, []);

 useEffect(() => {
if(emotions)
    loadModels();
  
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
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          
       
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
  //Calcul des statistiques d'expressions faciales
    const expressionStats = detections.map(detection => detection.expressions);

    
          
  

         // Parcours des détections pour calculer les statistiques
    expressionStats.forEach(expressions => {
      if (expressions.happy > 0.5) {
        happyCount++;
      } else if (expressions.angry > 0.5) {
        angryCount++;
      } else if (expressions.sad > 0.5) {
        sadCount++;
      }
      else if (expressions.neutral > 0.5) {
        neutralCount++;
      }
      
    });
    const totalFaces = happyCount+sadCount+neutralCount+angryCount;
    const happyPercentage = (happyCount / totalFaces) * 100;
    const angryPercentage = (angryCount / totalFaces) * 100;
    const sadPercentage = (sadCount / totalFaces) * 100;
    const neutralPercentage= (neutralCount / totalFaces) * 100;
    
     
  
         // to draw the detection onto the detected face i.e the box
          faceapi.draw.drawDetections(canvasRef.current, resized);
          //to draw the the points onto the detected face
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
          faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      

 }, 1000);

  
 };



  return (

   

   
    <div className='flex pb-[2%] w-full' style={{ width: '100%', height: '95vh' }}>
    
       <video className={`border  mb-12 ${largeurEcran > 1320 ? 'w-[600px]' : 'sm:w-1/2 md:w-[200px] lg:w-[300px] 2xl:w-[500px]'}`} ref={videoRef} style={{ height: '100%' }}>   </video>
       <canvas className='absolute top-20' ref={canvasRef} width="940" height="650" />
      
     </div>
     
  );
};
