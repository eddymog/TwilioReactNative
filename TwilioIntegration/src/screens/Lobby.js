import React from 'react';
import { Text } from 'react-native';
import { Container, View, Content, Form, Item, Input, Button } from 'native-base';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <View>
      <View>
        <Text>Enter a roo!m!</Text>
      </View>
      <View style={{marginTop: 50}}>
        <Form>
          <Item style={{marginBottom: 20}} regular>
            <Input value={username} placeholder="Username" onChangeText={(text) => {
              console.log(text);
              handleUsernameChange(text) 
            }}/>
          </Item>
          <Item style={{marginBottom: 20}} regular>
            <Input value={roomName} placeholder="Room" onChangeText={(text) => {
              handleRoomNameChange(text)  
            }} />
          </Item>
        </Form>
      </View>
      <View style={{marginTop: 15}}>
        <Button success style={{padding: 15, textAlign: 'right'}} onPress={handleSubmit}>
          <Text>Click Me!</Text>
        </Button>
      </View>
    </View>
  );
};

export default Lobby;
