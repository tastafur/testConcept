import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

// Components
import Slider from '../../components/Slider';
import SearchButton from '../../components/search/SearchButton';

export default class Movies extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Discover',
    headerRight: <SearchButton navigation={navigation} />,
  });

  static propTypes = {
    fetchConfiguration: PropTypes.func,
    openDetailsEntertainment: PropTypes.func,
    movies: PropTypes.array,
    series: PropTypes.array,
    size: PropTypes.any,
  };

  openDetailsEntertainment = id => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id,
    });
  };

  componentDidMount() {
    const {fetchConfiguration} = this.props;
    fetchConfiguration();
  }

  render() {
    const {movies, series, size} = this.props;

    return (
      <View style={styles.container}>
        {size && (
          <>
            <Slider
              data={movies}
              size={size}
              onPress={this.openDetailsEntertainment}
            />
            <Slider
              data={series}
              size={size}
              onPress={this.openDetailsEntertainment}
            />
          </>
        )}
      </View>
    );
  }
}
