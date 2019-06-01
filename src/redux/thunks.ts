import { ThunkDispatch, ThunkAction } from "redux-thunk";
import AppState from "./state";
import { setPlaces, setRoutes, showNotification, updatePlace, selectPlace, updateSelectedPlace, addPlace, removePlace, setToken } from "./actions-creators";
import { isPlacesArray, isPlace } from "../models/Place";
import { isRoutesArray } from "../models/Routes";
import StateAction from "./actions";
import { uploadFile } from "../util/uploadFile";
import { throwErr } from "../util/throw";

const API_PATH = '/admin/',
    PLACES_PATH = API_PATH + 'places',
    ROUTES_PATH = API_PATH + 'routes',
    LOGIN_PATH = API_PATH + 'login',
    REGISTER_PATH = API_PATH + 'register';

export function fetchPlaces(): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        fetch(PLACES_PATH, {
            headers: {
                'token': getState().token
            }
        })
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
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        fetch(ROUTES_PATH, {
            headers: {
                'token': getState().token
            }
        })
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

export function postPlaceUpdate(): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        const { selected, token } = getState(),
            place = selected.place;
        fetch(`${PLACES_PATH}/${place.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
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
        const { selected, token } = getState(),
            place = selected.place;

        fetch(PLACES_PATH, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(place)
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Request status: ${response.status} - ${response.statusText}`);
                }
            })
            .then(place => {
                if (isPlace(place)) {
                    dispatch(addPlace(place));
                    dispatch(selectPlace(null));
                    dispatch(showNotification('Место успешно добавлено.'));
                } else {
                    throwErr('Invalid response' + place);
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(showNotification('Что-то пошло не так...', 'error'));
            })
    }
}

export function deletePlace(id: number): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        const { places, selected, token } = getState(),
            selectedPlace = selected.place;

        if (!places.some(place => place.id === id)) {
            console.error(`Place with id '${id} doesn't exists`);
            return;
        }

        fetch(PLACES_PATH + '/' + id, {
            method: 'DELETE',
            headers: {
                'token': token
            }
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

export function loginUser(username: string, password: string): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        fetch(LOGIN_PATH, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => {
                switch (res.status) {
                    case 200:
                        return res.text();
                    case 422:
                        dispatch(showNotification('Такого пользователя нет.'));
                        throw new Error(`Request status: ${res.status} - ${res.statusText}`);
                    case 400:
                        dispatch(showNotification('Неверный пароль.'));
                        throw new Error(`Request status: ${res.status} - ${res.statusText}`);
                    default:
                        dispatch(showNotification('Что то пошло не так...'));
                        throw new Error(`Request status: ${res.status} - ${res.statusText}`);
                }
            })
            .then(token => dispatch(setToken(token)))
            .catch(err => console.error(err));
    }
}

export function registerUser(username: string, password: string): ThunkAction<void, {}, {}, StateAction> {
    return (dispatch: ThunkDispatch<AppState, {}, StateAction>, getState: () => AppState) => {
        fetch(REGISTER_PATH, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => {
                switch (res.status) {
                    case 200:
                        return res.text();
                    case 400:
                        dispatch(showNotification('Пользователь уже зарегистрирован.'));
                        throw new Error(`Request status: ${res.status} - ${res.statusText}`);
                    default:
                        dispatch(showNotification('Что то пошло не так...'));
                        throw new Error(`Request status: ${res.status} - ${res.statusText}`);
                }
            })
            .then(token => {
                dispatch(showNotification('Пользователь зарегестрирован.'));
                dispatch(setToken(token));
            })
            .catch(err => console.error(err));
    }
}
