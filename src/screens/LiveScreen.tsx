import React from 'react'
import { View, Text, Button } from 'react-native'

export default class LiveScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            style={{backgroundColor:'#d32f2f'}}
            title="Listen to the Live Broadcast"
            onPress={() => 
              this.props.navigation.navigate('MediaPlayer', { src: 'http://wtbu.bu.edu:1800/', title: 'WTBU Live' })
            }
          />
        </View>
      )
    }
}