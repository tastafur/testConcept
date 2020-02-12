import {connect} from 'react-redux';

import Search from './stateless';

// Utils
import {unNormalizeState} from '../../utils/commons';

// Actions
import {fetchSearch} from '../../actions/search';

// Selectors
import {
  getEntertainmentCover,
  filterForEntertainment,
} from '../../selectors/search';
import {getSize} from '../../selectors/configuration';

const mapStateToProps = state => ({
  entertainments: getEntertainmentCover(
    filterForEntertainment(unNormalizeState(state.entertainments)),
  ),
  size: getSize(state.configuration),
});

const mapDispatchToProps = dispatch => ({
  fetchSearch: query => dispatch(fetchSearch(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
