import React, { useState, useEffect, useRef } from 'react';
import Video from 'react-native-video';
import { Text } from 'react-native';

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  // const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  // const audioRef = useRef();

  const trackpubsToTracks = trackMap => {
    
    console.log("trackMap", trackMap);
    console.log(Array.from(trackMap.values()));
    
    return Array.from(trackMap.values())
    .map(publication => {
      console.log("publication", publication)
      return publication.track
    })
    .filter(track => track !== null);
  };

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    // setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        // setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        // setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      // setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  // useEffect(() => {
  //   const audioTrack = audioTracks[0];
  //   if (audioTrack) {
  //     audioTrack.attach(audioRef.current);
  //     return () => {
  //       audioTrack.detach();
  //     };
  //   }
  // }, [audioTracks]);

  console.log("participant", participant);
  console.log("videoRef", videoRef);
  // console.log("audioRef", audioRef);
  console.log("videoTracks", videoTracks);
  // console.log("audioTracks", audioTracks);

  return (
    <View className="participant">
      <Text>{participant.identity}</Text>
      {/* <Video source={{uri: "background"}} ref={videoRef} /> */}
      {/* <audio ref={audioRef} autoPlay={true} muted={true} /> */}
    </View>
  );
};

export default Participant;
