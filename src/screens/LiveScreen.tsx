import React from 'react'
import { View, Text } from 'react-native'

export default class LiveScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Live Screen</Text>
        </View>
      )
    }
}