import Place from "../models/Place";
import Route from "../models/Routes";
import Answer from "../models/Answer";

export enum ActionType {
    SET_PLACES = 'SET_PLACES_INFO',
    SET_ROUTES = 'SET_ROUTES_INFO',
    SELECT_PLACE = 'SELECT_PLACE',
    SELECT_ROUTE = 'SELECT_ROUTE',
    UPDATE_PLACE = 'UPDATE_PLACE',
    UPDATE_ROUTE = 'UPDATE_ROUTE',
    CREATE_ANSWER = 'ADD_ANSWER',
    REMOVE_ANSWER = 'REMOVE_ANSWER',
    UPDATE_ANSWER = 'UPDATE_ASWER'
}


export interface SetPlacesAction {
    type: ActionType.SET_PLACES;
    places: Place[];
}

export const setPlaces = (places: Place[]): SetPlacesAction => ({
    type: ActionType.SET_PLACES,
    places
})

export interface SetRoutesAction {
    type: ActionType.SET_ROUTES;
    routes: Route[];
}

export const setRoutes = (routes: Route[]): SetRoutesAction => ({
    type: ActionType.SET_ROUTES,
    routes
})

export interface SelectPlaceAction {
    type: ActionType.SELECT_PLACE;
    id: number;
}

export const selectPlace = (id: number): SelectPlaceAction => ({
    type: ActionType.SELECT_PLACE,
    id
})

export interface SelectRouteAction {
    type: ActionType.SELECT_ROUTE;
    id: number;
}

export const selectRoute = (id: number): SelectRouteAction => ({
    type: ActionType.SELECT_ROUTE,
    id
})

export interface UpdatePlaceAction {
    type: ActionType.UPDATE_PLACE;
    place: Place;
}

export const updatePlace = (place: Place): UpdatePlaceAction => ({
    type: ActionType.UPDATE_PLACE,
    place
})

export interface UpdateRouteAction {
    type: ActionType.UPDATE_ROUTE;
    route: Route;
}

export const updateRoute = (route: Route): UpdateRouteAction => ({
    type: ActionType.UPDATE_ROUTE,
    route
})

export interface CreateAnswerAction {
    type: ActionType.CREATE_ANSWER;
}

export const createAnswer = (): CreateAnswerAction => ({
    type: ActionType.CREATE_ANSWER,
})

export interface RemoveAnswerAction {
    type: ActionType.REMOVE_ANSWER;
    id: number;
}

export const removeAnwer = (id: number): RemoveAnswerAction => ({
    type: ActionType.REMOVE_ANSWER,
    id
})

export interface UpdateAnswerAction {
    type: ActionType.UPDATE_ANSWER;
    answer: Answer;
}

export const updateAnswer = (answer: Answer): UpdateAnswerAction => ({
    type: ActionType.UPDATE_ANSWER,
    answer
})

type StateAction  = SetPlacesAction | 
    SetRoutesAction | 
    SelectPlaceAction | 
    SelectRouteAction | 
    UpdatePlaceAction | 
    UpdateRouteAction | 
    CreateAnswerAction | 
    RemoveAnswerAction | 
    UpdateAnswerAction;

export default StateAction;
