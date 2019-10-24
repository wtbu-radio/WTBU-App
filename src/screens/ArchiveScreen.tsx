import React from 'react'
import { View, Text } from 'react-native'

import RadioShows from '../services/Headphones'

export default class ArchiveScreen extends React.Component {
    render() {
      let shows = new RadioShows()
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Archive Screen</Text>
        </View>
      )
    }
}