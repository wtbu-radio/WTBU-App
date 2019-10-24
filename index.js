/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {name as appName} from './app.json';
import App from './src/components/AppNavigator'; //Launch point

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
