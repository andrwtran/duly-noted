import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import sessionReducer from './session';
import bookReducer from './book';
import noteReducer from './note';
import tagReducer from './tag';
import taggedNoteReducer from './taggedNote';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  session: sessionReducer,
  book: bookReducer,
  note: noteReducer,
  tag: tagReducer,
  taggedNote: taggedNoteReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
