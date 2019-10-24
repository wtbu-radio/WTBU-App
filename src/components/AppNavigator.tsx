import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ArchiveScreen from '../screens/ArchiveScreen'
import LiveScreen from '../screens/LiveScreen'
import StationScreen from '../screens/StationScreen'

const BottomBarNavigator = createMaterialBottomTabNavigator(
      {
        Archive: {
            screen: ArchiveScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => <Icon name="schedule" color={tintColor} size={25}/>
            }
        },
        Live: {
            screen: LiveScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => <Icon name="radio" color={tintColor} size={25}/>
            }
        },
        Station: {
            screen: StationScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => <Icon name="explore" color={tintColor} size={25}/>
            }
        }
      },
      {
        initialRouteName: 'Live',
        shifting: true
      }
  )
  
  export default createAppContainer(BottomBarNavigator);