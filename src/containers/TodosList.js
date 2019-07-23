// @flow
import React from 'react';
import { connect } from 'react-redux';

import './TodosList.css';
import Todo from '../components/Todo';
import { getTodosList } from '../selectors/todosSelectors';

import type { IMap } from '../types/todos';


/**
 * UL element to hold todos list
 */
const TodosList = ({ todosList }) => {

    type NewTodoProps = {
        id: number,
        text: string,
        completed: boolean
    }

    return (
        <ul id="TodosList">
            {todosList.map((todo: IMap) => {
                const newProps: NewTodoProps = {
                    id: todo.get('id'),
                    text: todo.get('text'),
                    completed: todo.get('completed')
                }
                return < Todo key={ newProps.id } { ...newProps } />
            })}
        </ul>
    )
}

const mapStateToProps = (state: IMap) => {
    return {
        todosList: getTodosList(state)
    }
}

export default connect(mapStateToProps)(TodosList);