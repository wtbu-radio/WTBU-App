import React from 'react'
import { View, Text, Button } from 'react-native'

export default class LiveScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Live Screen</Text>
          <Button
          title="Go to Player"
          onPress={() => this.props.navigation.navigate('MediaPlayer')}
        />
        </View>
      )
    }
}