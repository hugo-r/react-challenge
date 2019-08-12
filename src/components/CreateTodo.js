// @flow
import React from 'react';
import { connect } from 'react-redux';

import './CreateTodo.css';
import store from '../store/store';
import { addTodo } from '../actions/actions';

import type { Dispatch, IList, IMap } from '../types/todos';

type Props = {
    addTodo: any
}


/**
 * FORM element to create todo task
 */
class CreateTodo extends React.Component<Props> {
    placeholder: string;
    inputRef: any;
    lastId: number;

    constructor(props: Props) {
        super(props);
        this.placeholder = 'Write new task here...';
        this.inputRef = React.createRef();
        this.lastId = 0;
    }

    handleClick = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.updateLastId();
        this.props.addTodo(this.lastId, this.inputRef.current.value.trim());
        this.inputRef.current.value = "";
        this.inputRef.current.focus();
    }

    updateLastId() {
        const todosList: IList<IMap> = store.getState().getIn(['todos', 'todos']);
        todosList.forEach((todo) => {
            if (todo.get('id') > this.lastId) {
                this.lastId = todo.get('id');
            }
        })
        ++this.lastId;
    }

    render() {
        return (
            <form id="CreateTodo" onSubmit={this.handleClick} >
                <input ref={this.inputRef} type='text' placeholder={this.placeholder} autoFocus required></input>
                <button type='submit'>CREATE</button>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        addTodo: (id: number, text: string) => dispatch(addTodo(id, text))
    }
}

export default connect(null, mapDispatchToProps)(CreateTodo);