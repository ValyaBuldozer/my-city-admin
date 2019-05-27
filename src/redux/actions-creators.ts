import Place from "../models/Place";
import Route from "../models/Routes";
import Answer from "../models/Answer";
import { ActionType } from "./actions";
import NotificationVariant from "../models/util/NotificationVariant";

export const setToken = (token: string) => (<const>{
    type: ActionType.SET_TOKEN,
    token
})

export const setPlaces = (places: Place[]) => (<const>{
    type: ActionType.SET_PLACES,
    places
})

export const setRoutes = (routes: Route[]) => (<const>{
    type: ActionType.SET_ROUTES,
    routes
})

export const selectPlace = (id: number) => (<const>{
    type: ActionType.SELECT_PLACE,
    id
})

export const selectRoute = (id: number) => (<const>{
    type: ActionType.SELECT_ROUTE,
    id
})

export const updateSelectedPlace = (place: Place) => (<const>{
    type: ActionType.UPDATE_SELECTED_PLACE,
    place
})

export const updateSelectedRoute = (route: Route) => (<const>{
    type: ActionType.UPDATE_SELECTED_ROUTE,
    route
})

export const updatePlace = (place: Place) => (<const>{
    type: ActionType.UPDATE_PLACE,
    place
})

export const updateRoute = (route: Route) => (<const>{
    type: ActionType.UPDATE_ROUTE,
    route
})

export const createPlace = () => (<const>{
    type: ActionType.CREATE_PLACE
})

export const createRoute = () => (<const>{
    type: ActionType.CREATE_ROUTE
})

export const addPlace = (place: Place) => (<const>{
    type: ActionType.ADD_PLACE,
    place
})

export const addRoute = (route: Route) => (<const>{
    type: ActionType.ADD_ROUTE,
    route
})

export const removePlace = (id: number) => (<const>{
    type: ActionType.REMOVE_PLACE,
    id
})

export const removeRoute = (id: number) => (<const>{
    type: ActionType.REMOVE_ROUTE,
    id
})

export const createAnswer = () => (<const>{
    type: ActionType.CREATE_ANSWER,
})

export const removeAnwer = (id: number) => (<const>{
    type: ActionType.REMOVE_ANSWER,
    id
})

export const updateAnswer = (answer: Answer) => (<const>{
    type: ActionType.UPDATE_ANSWER,
    answer
})

export const addPlaceRoute = (id: number) => (<const>{
    type: ActionType.ADD_PLACE_ROUTE,
    id
})

export const removePlaceRoute = (id: number) => (<const>{
    type: ActionType.REMOVE_PLACE_ROUTE,
    id
})

export const showNotification = (text: string, variant: NotificationVariant = 'default') => (<const>{
    type: ActionType.SET_NOTIFICATION,
    text,
    variant
})
