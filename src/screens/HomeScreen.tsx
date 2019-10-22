import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { RadioShows } from '../services/Headphones'

class HomeScreen extends React.Component {
    render() {
      new RadioShows()
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
      )
    }
  }
  
  const AppNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen,
    },
  })
  
  export default createAppContainer(AppNavigator);