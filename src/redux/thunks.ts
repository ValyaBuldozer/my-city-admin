import { ThunkDispatch, ThunkAction } from "redux-thunk";
import AppState from "./state";
import StateAction, { setPlaces, setRoutes } from "./actions";
import { isPlacesArray } from "../models/Place";
import { isRoutesArray } from "../models/Routes";

const API_PATH = '/admin/',
    PLACES_PATH = API_PATH + 'places',
    ROUTES_PATH = API_PATH + 'routes';

export function fetchPlaces(): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>) => {
        fetch(PLACES_PATH)
            .then(content => content.json())
            .then(places => {
                if (isPlacesArray(places)) {
                    dispatch(setPlaces(places));
                } else {
                    throw new Error('Invalid json format at places GET request.')
                }
            })
            .catch(err => console.error(err));
    }
}

export function fetchRoutes(): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>) => {
        fetch(ROUTES_PATH)
            .then(content => content.json())
            .then(routes => {
                if (isRoutesArray(routes)) {
                    dispatch(setRoutes(routes));
                } else {
                    throw new Error('Invalid json format at routes GET request.');
                }
            })
            .catch(err => console.error(err));
    }
}
