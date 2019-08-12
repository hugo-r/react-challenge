// @flow
import React from 'react';
import { connect } from 'react-redux';

import './Todo.css';
import { deleteTodo, updateTodo, toggleTodo } from '../actions/actions';

import type { Dispatch } from '../types/todos';

type Props = {
    updateTodo: any,
    deleteTodo: any,
    toggleTodo: any,
    id: number,
    text: string,
    completed: boolean,
}


/**
 * LI element with todo task
 */
class Todo extends React.Component<Props> {
    formRef: any;
    inputRef: any;
    editButtonRef: any;
    state: {
        isEditingText: boolean
    }

    constructor(props: Props) {
        super(props);
        this.formRef = React.createRef();
        this.inputRef = React.createRef();
        this.editButtonRef = React.createRef();
        this.state = {
            isEditingText: false
        }
    }

    handleClickDelete = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
        this.props.deleteTodo(this.props.id);
    }

    handleClickEdit = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
        this.enableEditing();
        this.inputRef.current.focus();
    }

    handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.formRef.current.reportValidity();
            this.props.updateTodo(this.props.id, this.inputRef.current.value.trim());
            this.disableEditing();
        } else if (event.key === 'Escape') {
            this.inputRef.current.value = this.props.text;
            this.disableEditing();
        }
    }

    handleBlur = (event: SyntheticEvent<>) => {
        if (this.inputRef.current.readOnly === false) {
            this.inputRef.current.value = this.props.text;
            this.disableEditing();
        }
    }

    handleCheckboxChange = (event: SyntheticMouseEvent<HTMLInputElement>) => {
        this.props.toggleTodo(this.props.id);
    }

    enableEditing() {
        this.toggleClass();
        this.inputRef.current.readOnly = false;
        this.editButtonRef.current.disabled = true;
    }

    disableEditing() {
        this.toggleClass();
        this.inputRef.current.readOnly = true;
        this.editButtonRef.current.disabled = false;
    }

    toggleClass() {
        this.setState({ isEditingText: !this.state.isEditingText });
    }

    render() {
        return (
            <li className='Todo'>
                <form ref={this.formRef}>
                    <input type='checkbox' onChange={this.handleCheckboxChange} checked={this.props.completed}></input>
                    <input type='text' className={this.state.isEditingText ? 'enabledEdit' : null} ref={this.inputRef} defaultValue={this.props.text} onKeyDown={this.handleKeyDown} onBlur={this.handleBlur} readOnly required ></input>
                    <div>
                        <button type='button' ref={this.editButtonRef} onClick={this.handleClickEdit} >Edit</button>
                        <span>/</span>
                        <button type='button' onClick={this.handleClickDelete} >Delete</button>
                    </div>
                </form>
            </li>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateTodo: (id: number, text: string) => dispatch(updateTodo(id, text)),
        deleteTodo: (id: number) => dispatch(deleteTodo(id)),
        toggleTodo: (id: number) => dispatch(toggleTodo(id))
    }
}

export default connect(null, mapDispatchToProps)(Todo);