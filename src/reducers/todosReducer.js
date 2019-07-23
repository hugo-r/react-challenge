// @flow
import { fromJS } from 'immutable';

import { actionType, visibilityFilter } from '../actions/actions';
import initialState from '../store/initialState';

import type { SortingAction, IMap, IList, TodoAction, VisibilityFilter } from '../types/todos';


export default (state: IMap = initialState, action: TodoAction | SortingAction): IMap => {
    let index: number;
    switch (action.type) {
        case actionType.ADD_TODO:
            const newTodo: IMap = fromJS({
                id: action.id,
                text: action.text,
                completed: false
            });
            return state.update('todos', (todos) => todos.push(newTodo))

        case actionType.UPDATE_TODO:
            index = getTodoIndex(state.get('todos'), action.id);
            return (index !== -1)
                ? state.updateIn(['todos', index, 'text'], () => action.text)
                : state;

        case actionType.DELETE_TODO:
            index = getTodoIndex(state.get('todos'), action.id);
            return (index !== -1)
                ? state.deleteIn(['todos', index])
                : state;

        case actionType.TOGGLE_TODO:
            index = getTodoIndex(state.get('todos'), action.id);
            return (index !== -1)
                ? state.updateIn(['todos', index, 'completed'], (completed) => !completed)
                : state;

        case actionType.SORT_BY:
            return state.setIn(['sortingOrder'], action.sortingOrder);

        case actionType.TOGGLE_VISIBILITY_FILTER:
            const visibilityFiltersArray: Array<VisibilityFilter> = Object.keys(visibilityFilter);
            const newFilterIndex: number = (-1 * (visibilityFiltersArray.indexOf(state.get('visibilityFilter')) - 1));
            const newVisibilityFilter: VisibilityFilter = visibilityFiltersArray[newFilterIndex];
            return state.setIn(['visibilityFilter'], newVisibilityFilter);

        default:
            return state;
    }
}

const getTodoIndex = (todos: IList, id: number): number => {
    return todos.findIndex(todo => todo.get('id') === id);
}