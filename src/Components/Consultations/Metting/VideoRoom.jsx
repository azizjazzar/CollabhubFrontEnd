import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';

const APP_ID = "36067b6e79984e48828b420ceeea0b5c";
const TOKEN = "007eJxTYLihsXevEu/xWX/YD3IlXljx9Oi7s81L0m+pv+DRusYSdFBBgcHYzMDMPMks1dzS0sIk1cTCwsgiycTIIDk1NTXRIMk0+azr49SGQEaG6RMmszAyQCCIz8ngnJ+Tk5iUUZrEwAAAaw4jBg==";
const CHANNEL = "Collabhub";

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  const toggleCamera = () => {
    setIsCameraOn(prevState => !prevState);
    localTracks[1].setEnabled(!isCameraOn); // Toggle camera state
  };

  const toggleAudio = () => {
    setIsAudioOn(prevState => !prevState);
    localTracks[0].setEnabled(!isAudioOn); 
  };

  useEffect(() => {
    const handleUserJoined = async (user, mediaType) => {
      await client.subscribe(user, mediaType);

      if (mediaType === 'video') {
        setUsers(previousUsers => [...previousUsers, user]);
      }

      if (mediaType === 'audio') {
        user.audioTrack.play();
      }
    };

    const handleUserLeft = user => {
      setUsers(previousUsers =>
        previousUsers.filter(u => u.uid !== user.uid)
      );
    };

    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then(uid =>
        Promise.all([
          AgoraRTC.createMicrophoneAndCameraTracks(),
          uid,
        ])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers(previousUsers => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      localTracks.forEach(track => {
        track.stop();
        track.close();
      });

      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  return (
    <div className="pt-24">
      <div>
        <button onClick={toggleCamera}>
          {isCameraOn ? 'Désactiver la caméra' : 'Activer la caméra'}
        </button>
        <button onClick={toggleAudio}>
          {isAudioOn ? 'Désactiver l\'audio' : 'Activer l\'audio'}
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 500px)',
        }}
      >
        {users.map(user => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
