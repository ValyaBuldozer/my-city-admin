import { ThunkDispatch, ThunkAction } from "redux-thunk";
import AppState from "./state";
import { setPlaces, setRoutes, showNotification, updatePlace, selectPlace } from "./actions-creators";
import { isPlacesArray, isPlace } from "../models/Place";
import { isRoutesArray } from "../models/Routes";
import StateAction from "./actions";

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

// TODO(it's so bad...)
export function fetchData(): ThunkAction<void, {}, {}, StateAction> {
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
            .catch(err => console.error(err))
            .finally(() => {
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
            });
    }
}

export function postPlaceUpdate(): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        const place = getState().selected.place;
        fetch(`${PLACES_PATH}/${place.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(place)
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Request status: ${response.status} - ${response.statusText}`)
                }
            })
            .then(place => {
                dispatch(showNotification('Updated'));
                dispatch(updatePlace(place));
                dispatch(selectPlace(null));
            })
            .catch(err => console.error(err))
    }
}
