import Place from "../models/Place";
import Route from "../models/Routes";

export enum ActionType {
    SET_PLACES = 'SET_PLACES_INFO',
    SET_ROUTES = 'SET_ROUTES_INFO',
    SELECT_PLACE = 'SELECT_PLACE',
    SELECT_ROUTE = 'SELECT_ROUTE',
    UPDATE_PLACE = 'UPDATE_PLACE',
    UPDATE_ROUTE = 'UPDATE_ROUTE'
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

export interface SelectPlace {
    type: ActionType.SELECT_PLACE;
    id: number;
}

export const selectPlace = (id: number): SelectPlace => ({
    type: ActionType.SELECT_PLACE,
    id
})

export interface SelectRoute {
    type: ActionType.SELECT_ROUTE;
    id: number;
}

export const selectRoute = (id: number): SelectRoute => ({
    type: ActionType.SELECT_ROUTE,
    id
})

type StateAction  = SetPlacesAction | 
    SetRoutesAction | 
    SelectPlace | 
    SelectRoute;

export default StateAction;
