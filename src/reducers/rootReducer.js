import { combineReducers } from 'redux-immutable';

import todosReducer from './todosReducer';


export default combineReducers({
    todos: todosReducer
});