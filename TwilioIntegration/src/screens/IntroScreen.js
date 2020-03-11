import React from 'react'
import { Text } from 'react-native'
import { Container, Button, View, Icon } from 'native-base';
import VideoChat from './VideoChat'

class IntroScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Video Chat with Hooks!</Text>
        <View>
          <VideoChat />
        </View>
      </View>
    );
  }
}

export default IntroScreen;
