import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
// import Participant from './Participant';
import { Text } from 'react-native';
import { View, Container, Header, Content, Form, Item, Input, Button } from 'native-base';

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    console.log('myToken', token)
    Video.connect(token, {
      name: roomName
    }).then(room => {
      console.log("Room after connect", room);
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  // const remoteParticipants = participants.map(participant => (
  //   <Participant key={participant.sid} participant={participant} />
  // ));

  console.log("participants", participants)
  console.log("room", room);

  return (
    <View className="room">
      <Text>Room: </Text>
      {/* <Button onPress={handleLogout}>Log out</Button> */}
      {/* <View className="local-participant"> */}
        {/* {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ''
        )} */}
      {/* </View> */}
      <Text>Remote Participants</Text>
      {/* <View className="remote-participants">{remoteParticipants}</View> */}
    </View>
  );
};

export default Room;
