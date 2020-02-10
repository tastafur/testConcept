import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'

// Screens
import MoviesScreen from '../screens/Movies';
import DetailScreen from '../screens/secondaries/Detail';
import PlayMovie from '../screens/secondaries/PlayMovie';
import SearchScreen from '../screens/Search';

export const AppNavigator = createStackNavigator(
  {
    Movies: {
      screen: MoviesScreen,
    },

    Detail: {
      screen: DetailScreen,
    },

    PlayMovie: {
      screen: PlayMovie,
      navigationOptions: {
        header: null,
      },
    },

    Search: {
      screen: SearchScreen,
      defaultNavigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'Movies',
    headerMode: 'screen',
    defaultNavigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
