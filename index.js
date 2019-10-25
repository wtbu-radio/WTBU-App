/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {name as appName} from './app.json';
import App from './src/components/AppNavigator'; //Launch point

import TrackPlayer from 'react-native-track-player';
import MediaPlayer from './src/services/MediaPlayer'

TrackPlayer.setupPlayer().then(() => {
    // The player is ready to be used
});

const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#d32f2f',
      accent: '#D81B60',
    },
};

const darkTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#7b1fa2',
      accent: '#ae52d4',
      background: '121212',
      surface: '#1e1e1e',
      text: 'white'
    },
}

export default function Main() {
    const theme = lightTheme
    changeNavigationBarColor(theme.colors.primary, false)
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => MediaPlayer);

TrackPlayer.updateOptions({
    // An array of media controls capabilities
    // Can contain CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_STOP, CAPABILITY_SEEK_TO,
    // CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS, CAPABILITY_SET_RATING
    capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP
    ],
    
    // An array of capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
    ]
})