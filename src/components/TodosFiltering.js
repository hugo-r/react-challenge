// @flow
import React from 'react';
import { connect } from 'react-redux';

import './TodosFiltering.css';
import { toggleVisibilityFilter, visibilityFilter } from '../actions/actions';

import type { Dispatch, IMap } from '../types/todos';

type Props = {
    hideCompleted: boolean,
    toggleVisibilityFilter: any
}


/**
 * INPUT checkbox element to filter tasks ('show all' and 'uncompleted')
 */
class TodosFiltering extends React.Component<Props> {

    handleCheckboxChange = (event: SyntheticMouseEvent<HTMLInputElement>) => {
        this.props.toggleVisibilityFilter();
    }

    render() {
        return (
            <label id='TodosFiltering'>Hide completed
                <input type='checkbox' onChange={this.handleCheckboxChange} checked={this.props.hideCompleted} />
            </label>
        );
    }
}

const mapStateToProps = (state: IMap) => {
    return {
        hideCompleted: (state.getIn(['todos', 'visibilityFilter']) !== visibilityFilter.SHOW_ALL)
    }
}

const mapDispatchToProperties = (dispatch: Dispatch) => {
    return {
        toggleVisibilityFilter: () => dispatch(toggleVisibilityFilter())
    }
}

export default connect(mapStateToProps, mapDispatchToProperties)(TodosFiltering);