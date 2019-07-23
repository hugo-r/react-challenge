import { fromJS } from 'immutable';

import { visibilityFilter, sortingOrder } from '../actions/actions';

export default fromJS({
    todos: [],
    visibilityFilter: visibilityFilter.SHOW_ALL,
    sortingOrder: sortingOrder.DATE_ASC
});