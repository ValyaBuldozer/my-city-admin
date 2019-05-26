import { ThunkDispatch, ThunkAction } from "redux-thunk";
import AppState from "./state";
import { setPlaces, setRoutes, showNotification, updatePlace, selectPlace, updateSelectedPlace, addPlace, removePlace } from "./actions-creators";
import { isPlacesArray, isPlace } from "../models/Place";
import { isRoutesArray } from "../models/Routes";
import StateAction from "./actions";
import { uploadFile } from "../util/uploadFile";
import { throwErr } from "../util/throw";

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
                dispatch(showNotification('Место обновлено.'));
                dispatch(updatePlace(place));
                dispatch(selectPlace(null));
            })
            .catch(err => console.error(err))
    }
}

export function uploadPlaceImage(file: File): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        uploadFile(file)
            .then(filePath => {
                dispatch(updateSelectedPlace({
                    ...getState().selected.place,
                    image_path: filePath
                }))
                dispatch(showNotification('Изображение загружено.'))
            })
            .catch(err => console.error(err));
    }
}

export function uploadPlaceLogo(file: File): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        uploadFile(file)
            .then(filePath => {
                dispatch(updateSelectedPlace({
                    ...getState().selected.place,
                    logo_path: filePath
                }))
                dispatch(showNotification('Логотип загружен.'))
            })
            .catch(err => console.error(err));
    }
}

export function putNewPlace(): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        const { place } = getState().selected;

        fetch(PLACES_PATH, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(place)
        })
            .then(response => {
                if (response.status === 200) {
                    return +response.text();
                } else {
                    throw new Error(`Request status: ${response.status} - ${response.statusText}`);
                }
            })
            .then(placeId => {
                dispatch(addPlace({
                    ...place,
                    id: placeId
                }));
                dispatch(selectPlace(null));
                dispatch(showNotification('Место успешно добавлено.'))
            })
            .catch(err => {
                console.error(err);
                dispatch(showNotification('Что-то пошло не так...', 'error'));
            })
    }
}

export function deletePlace(id: number): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        const { places, selected } = getState(),
            selectedPlace = selected.place;

        if (!places.some(place => place.id === id)) {
            console.error(`Place with id '${id} doesn't exists`);
            return;
        }

        fetch(PLACES_PATH + '/' + id, {
            method: 'DELETE'
        })
            .then(response => response.status === 200 
                ? response.text() 
                : throwErr(`Request status: ${response.status} - ${response.statusText}`)
            )
            .then(() => {
                if (selectedPlace && selectedPlace.id === id) {
                    dispatch(selectPlace(null));
                }
                dispatch(removePlace(id));
                dispatch(showNotification('Место удалено.'));
            })
            .catch(err => {
                console.error(err);
                dispatch(showNotification('Что-то пошло не так...', 'error'));
            })
    }
}
