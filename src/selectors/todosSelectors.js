// @flow
import { createSelector } from 'reselect';

import { sortingOrder, visibilityFilter } from '../actions/actions';

import type { IList, IMap, SortingOrder, VisibilityFilter } from '../types/todos';

const getVisibilityFilter = (state: IMap): VisibilityFilter => state.getIn(['todos', 'visibilityFilter']);
const getSortingOrder = (state: IMap): SortingOrder => state.getIn(['todos', 'sortingOrder']);
const getTodos = (state: IMap): IList => state.getIn(['todos', 'todos']);


const getVisibleTodos = createSelector(
    [getVisibilityFilter, getTodos],
    (currentVisibilityFilter: VisibilityFilter, todos: IList): IList => {
        switch (currentVisibilityFilter) {
            case visibilityFilter.SHOW_ALL:
                return todos;
            case visibilityFilter.SHOW_UNCOMPLETED:
                return todos.filter((todo: IMap) => !todo.get('completed'));
            default:
                return todos;
        }
    }
);

export const getTodosList = createSelector(
    [getSortingOrder, getVisibleTodos],
    (currentSortingOrder: SortingOrder, visibleTodos: IList): IList => {
        switch (currentSortingOrder) {
            case sortingOrder.DATE_ASC:
                return visibleTodos.sort((previousTodo: IMap, nextTodo: IMap) => {
                    return (previousTodo.get('id') > nextTodo.get('id')) ? 1 : -1;
                });
            case sortingOrder.ALPHABETICAL_ASC:
                return visibleTodos.sort((previousTodo: IMap, nextTodo: IMap) => {
                    return (previousTodo.get('text') > nextTodo.get('text')) ? 1 : -1;
                });
            case sortingOrder.ALPHABETICAL_DESC:
                return visibleTodos.sort((previousTodo: IMap, nextTodo: IMap) => {
                    return (previousTodo.get('text') < nextTodo.get('text')) ? 1 : -1;
                });
            default:
                return visibleTodos;
        }
    }
);