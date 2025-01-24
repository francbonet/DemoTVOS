import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/ListScreen';
import DetailMovieScreen from '../screens/DetailMovieScreen';
import Screen from '../screens/Screen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Search" component={Screen} />
    <Stack.Screen name="Movies" component={HomeScreen} />
    <Stack.Screen name="Series" component={HomeScreen} />
    <Stack.Screen name="Originals" component={HomeScreen} />
    <Stack.Screen name="Settings" component={Screen} />
    <Stack.Screen name="DetailMovie" component={DetailMovieScreen} />
    <Stack.Screen name="Player" component={PlayerScreen} options={{
      presentation: 'modal',
    }}/>
  </Stack.Navigator>
);

export default AppNavigation;
