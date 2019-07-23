import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import immutableDecorator from 'redux-storage-decorator-immutablejs';
import merger from 'redux-storage-merger-immutablejs';
import immutable from 'immutable';

import rootReducer from '../reducers/rootReducer';

//const engine = createEngine('todos');
/*engine = immutableDecorator(engine, [
  ['todos']
]);*/
const engine = immutableDecorator(createEngine('todos'), [
    ['todos']
]);
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const reducer = storage.reducer(rootReducer, merger);
const store = createStoreWithMiddleware(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        serialize: {
            immutable: immutable
        }
    })
);
const load = storage.createLoader(engine);
load(store);
/*  .then((newState) => console.log('Loaded state:', newState))
  .catch(() => console.log('Failed to load previous state')); */

export default store;