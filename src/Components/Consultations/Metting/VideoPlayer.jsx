import React, { useEffect, useRef } from 'react';
import '@/widgets/assets/meeting.css'; // Import du fichier CSS

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      Uid: {user.uid}
      <div style={{ paddingLeft: '200px' , paddingTop: '280px'  }}>
        <div className='webcam-container'
          ref={ref}
          style={{ width: '500px', height: '400px' }}
        ></div>
      </div>
    </div>
  );
};
