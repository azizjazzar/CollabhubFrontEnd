import React, { useEffect, useRef } from 'react';
import '@/widgets/assets/meeting.css'; // Import du fichier CSS
import { useAuth } from '@/pages/authContext';
export const VideoPlayer = ({ user }) => {
  const ref = useRef();
  const { authData, setAuthUserData } = useAuth();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, [user.videoTrack]);
  return (
    <div className='flex pb-[160px] w-[500px]' style={{ width: '100%', height: '100vh' }}>
      <div style={{ width: '100%', height: '100%' }}>
        <div className='border mb-12' ref={ref} style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  );
};
