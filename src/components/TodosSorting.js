// @flow
import React from 'react';
import { connect } from 'react-redux';

import './TodosSorting.css';
import { sortingOrder, sortBy } from '../actions/actions';

import type { Dispatch, IMap, SortingOrder } from '../types/todos';

type Props = {
    sortingOrder: SortingOrder,
    sortBy: any
}

/**
 * BUTTON element to toggle the sorting order of the list
 */
class TodosSorting extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.state = {
            sortingOrder: [
                sortingOrder.DATE_ASC,
                sortingOrder.ALPHABETICAL_ASC,
                sortingOrder.ALPHABETICAL_DESC
            ]
        };
    }

    handleClick = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.props.sortBy(this.nextSortingOrder());
    }

    nextSortingOrder() {
        const currentSortingOrderIndex: number = this.state.sortingOrder.indexOf(this.props.sortingOrder);
        return (currentSortingOrderIndex < (this.state.sortingOrder.length - 1))
            ? this.state.sortingOrder[currentSortingOrderIndex + 1]
            : this.state.sortingOrder[0];
    }

    render() {
        return (
            <div id='TodosSorting'>
                <button onClick={this.handleClick}>
                    Tasks
                </button>
            </div>
        )

    };
}

const mapStateToProps = (state: IMap) => {
    return {
        sortingOrder: state.getIn(['todos', 'sortingOrder'])
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sortBy: (sortingOrder: SortingOrder) => dispatch(sortBy(sortingOrder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosSorting);