import React, { useState, useCallback } from 'react';
import { Text } from 'react-native'
import Lobby from './Lobby';
import Room from './Room';
// import Experiment from './Experiment';s

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(value => {
    setUsername(value);
  }, []);

  const handleRoomNameChange = useCallback(value => {
    setRoomName(value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      console.log("Clicked submit!");
      const url = 'http://dc5d67b2.ngrok.io';
  
      const data = await fetch(`${url}/video/token`, {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      console.log("handleSubmitData", data);
      setToken(data.token);
    },
    [roomName, username]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  const handleMySubmit = () => {
    console.log('http://c5479427.ngrok.io/api/greeting');
    fetch('http://c5479427.ngrok.io/api/greeting')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });      
  }

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
      // <Text>Hello!!!</Text>
    );
  }
  return render;
};

export default VideoChat;

// "proxy": "http://localhost:4000",