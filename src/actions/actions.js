// @flow

import type {
    TodoAction,
    VisibilityAction,
    SortingAction, SortingOrder } from '../types/todos';

export const actionType = Object.freeze({
    ADD_TODO: 'ADD_TODO',
    UPDATE_TODO: 'UPDATE_TODO',
    DELETE_TODO: 'DELETE_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO',
    TOGGLE_VISIBILITY_FILTER: 'TOGGLE_VISIBILITY_FILTER',
    SORT_BY: 'SORT_BY'
});

export const visibilityFilter = Object.freeze({
    SHOW_ALL: 'SHOW_ALL',
    SHOW_UNCOMPLETED: 'SHOW_UNCOMPLETED'
});

export const sortingOrder = Object.freeze({
    "DATE_ASC": "DATE_ASC",
    "ALPHABETICAL_ASC": "ALPHABETICAL_ASC",
    "ALPHABETICAL_DESC": "ALPHABETICAL_DESC"
});


export const addTodo = (id: number, todo: string): TodoAction => {
    return {
        type: actionType.ADD_TODO,
        id: id,
        text: todo
    }
}

export const updateTodo = (id: number, todo: string): TodoAction => {
    return {
        type: actionType.UPDATE_TODO,
        id: id,
        text: todo
    }
}

export const deleteTodo = (id: number): TodoAction => {
    return {
        type: actionType.DELETE_TODO,
        id: id
    }
}

export const toggleTodo = (id: number): TodoAction => {
    return {
        type: actionType.TOGGLE_TODO,
        id: id
    }
}

export const toggleVisibilityFilter = (): VisibilityAction => {
    return {
        type: actionType.TOGGLE_VISIBILITY_FILTER
    }
}

export const sortBy = (sortingOrder: SortingOrder): SortingAction => {
    return {
        type: actionType.SORT_BY,
        sortingOrder: sortingOrder
    }
}