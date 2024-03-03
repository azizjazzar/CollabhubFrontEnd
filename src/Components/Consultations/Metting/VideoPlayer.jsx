import React, { useEffect, useRef } from 'react';
import '@/widgets/assets/meeting.css'; // Import du fichier CSS

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div className='flex pb-[160px] w-[500px]' style={{ width: '100%', height: '100vh' }}>
      <div style={{ width: '100%', height: '100%' }}>
        <div className='border mb-12' ref={ref} style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  );
};
