import * as actions from './actions-creators';

export enum ActionType {
    SET_PLACES = 'SET_PLACES_INFO',
    SET_ROUTES = 'SET_ROUTES_INFO',
    SELECT_PLACE = 'SELECT_PLACE',
    SELECT_ROUTE = 'SELECT_ROUTE',
    UPDATE_PLACE = 'UPDATE_PLACE',
    UPDATE_ROUTE = 'UPDATE_ROUTE',
    CREATE_ANSWER = 'ADD_ANSWER',
    REMOVE_ANSWER = 'REMOVE_ANSWER',
    UPDATE_ANSWER = 'UPDATE_ASWER',
    ADD_PLACE_ROUTE = 'ADD_PLACE_ROUTE',
    REMOVE_PLACE_ROUTE = 'REMOVE_PLACE_ROUTE'
}

type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;

type StateAction = ReturnType<InferValueTypes<typeof actions>>;

export default StateAction;