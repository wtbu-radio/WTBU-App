import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ArchiveScreen from '../screens/ArchiveScreen'
import LiveScreen from '../screens/LiveScreen'
import StationScreen from '../screens/StationScreen'
import MediaPlayerScreen from '../screens/MediaPlayerScreen'

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
    shifting: true,
    barStyle: { paddingBottom: 0 },
  }
)

const AppStack = createStackNavigator(
  {
    Tabs: {
      screen: BottomBarNavigator,
    },
    MediaPlayer: {
      screen : MediaPlayerScreen,
    }
    /* any other route you want to render above the tab bar */
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'WTBU Everywhere! :)',
      headerRight: <Icon name="brightness-4" size={25} style={{ paddingRight: 12}}/>
    }
  }
);
  
export default createAppContainer(AppStack);