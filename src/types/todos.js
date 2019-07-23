// @flow
import { List as iList, Map as iMap } from 'immutable';

import type { Dispatch as ReduxDispatch } from 'redux';

import { actionType, visibilityFilter, sortingOrder } from '../actions/actions';

export type ActionType = $Keys<typeof actionType>;
export type VisibilityFilter = $Keys<typeof visibilityFilter>;
export type SortingOrder = $Keys<typeof sortingOrder>;

export type TodoAction = $ReadOnly<{
    type: ActionType,
    id: number,
    text?: string,
    completed?: boolean
}>;

export type VisibilityAction = $ReadOnly<{
    type: ActionType
}>;

export type SortingAction = $ReadOnly<{
    type: ActionType,
    sortingOrder: SortingOrder
}>;

type Action = TodoAction | VisibilityAction | SortingAction;

export type Dispatch = ReduxDispatch<Action>;

export type IMap = iMap<string, any>;
export type IList = iList<IMap>;