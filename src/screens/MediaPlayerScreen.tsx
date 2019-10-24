import React from 'react'
import { View, Text } from 'react-native'

export default class MediaPlayerScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Media Player</Text>
          <Text>{this.props.navigation.getParam('src', 'https://google.com')}</Text>
        </View>
      )
    }
}