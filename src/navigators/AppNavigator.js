import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

// Screens
import MoviesScreen from '../screens/Movies';
import DetailScreen from '../screens/secondaries/Detail';
import PlayMovie from '../screens/secondaries/PlayMovie';
import SearchScreen from '../screens/Search';
import SearchButton from '../components/search/SearchButton';

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Movies"
      headerMode="screen"
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="Movies"
        component={MoviesScreen}
        options={({navigation}) => ({
          title: 'Discover',
          headerRight: <SearchButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: 'detail',
        }}
      />
      <Stack.Screen
        name="PlayMovie"
        component={PlayMovie}
        options={{
          header: null,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: null,
          gestureEnabled: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
