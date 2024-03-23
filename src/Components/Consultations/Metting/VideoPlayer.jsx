import React, { useEffect, useRef } from 'react';
import '@/widgets/assets/meeting.css'; // Import du fichier CSS
import { useAuth } from '@/pages/authContext';

export const VideoPlayer = ({ user }) => {
  const ref = useRef();
  const { authData, setAuthUserData } = useAuth();
  const largeurEcran = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, [user.videoTrack]);

  return (
    <div className='flex pb-[2%] w-full' style={{ width: '100%', height: '95vh' }}>
      <div className={`border  mb-12 ${largeurEcran > 1320 ? 'w-[600px]' : 'sm:w-1/2 md:w-[200px] lg:w-[300px] 2xl:w-[500px]'}`} ref={ref} style={{ height: '100%' }}></div>
    </div>
  );
};
