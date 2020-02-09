import { createStackNavigator,  StackViewTransitionConfigs } from 'react-navigation';

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
      transitionConfig: () => StackViewTransitionConfigs.NoAnimation,
      defaultNavigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'Movies',
    headerMode: 'screen',
    transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS
  }
);
