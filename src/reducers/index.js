import { combineReducers } from 'redux';

import { configuration } from './configuration';
import { movies } from './movies';
import { series } from './series';
import { entertainments } from './search';

export default combineReducers({
  configuration,
  movies,
  series,
  entertainments
})
