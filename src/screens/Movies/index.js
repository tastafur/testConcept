import {connect} from 'react-redux';

import Movies from './stateless';

// Utils
import {unNormalizeState} from '../../utils/commons';

// Actions
import {fetchConfiguration} from '../../actions/configuration';

// Selectors
import {getMovieCover} from '../../selectors/movies';
import {getSerieCover} from '../../selectors/series';
import {getSize} from '../../selectors/configuration';

const mapStateToProps = state => ({
  movies: getMovieCover(unNormalizeState(state.movies)),
  series: getSerieCover(unNormalizeState(state.series)),
  size: getSize(state.configuration),
});

const mapDispatchToProps = dispatch => ({
  fetchConfiguration: () => dispatch(fetchConfiguration()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Movies);
