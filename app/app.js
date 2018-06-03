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

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Note: { screen: NoteScreen }
},
{ headerMode: 'screen' });
export default App;
