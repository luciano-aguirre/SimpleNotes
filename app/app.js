import React from 'react';
import {
  AppRegistry,
  Button,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/home-screen';
import NoteScreen from './screens/note-screen';
import ConfigScreen from './screens/config-screen'

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Note: { screen: NoteScreen },
  Config: { screen: ConfigScreen}
},
{ headerMode: 'screen' });
export default App;
