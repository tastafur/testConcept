import React from 'react';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from '../../../components/VideoPlayer';

function PlayMovie() {
  const navigation = useNavigation();
  return <VideoPlayer navigation={navigation} />;
}

PlayMovie.propTypes = {
  navigation: PropTypes.object,
};

export default PlayMovie;
