import AppState, { initialState } from "./state";
import StateAction, { ActionType } from "./actions";

function appReducer(state: AppState = initialState, action: StateAction = null): AppState {
    switch(action.type) {
        case ActionType.SET_PLACES: {
            return {
                ...state,
                places: action.places
            }
        }

        case ActionType.SET_ROUTES: {
            return {
                ...state,
                routes: action.routes
            }
        }

        case ActionType.SELECT_PLACE: {
            const place = state.places.find(place => place.id === action.id);

            return {
                ...state,
                selected: {
                    ...state.selected,
                    place: place && { ...place, answers: [...place.answers], routes: [...place.routes] }
                }
            }
        }

        case ActionType.SELECT_ROUTE: {
            const route = state.routes.find(route => route.id === action.id);

            return {
                ...state,
                selected: {
                    ...state.selected,
                    route: route && { ...route, places: [...route.places] }
                }
            }
        }

        default: {
            return state;
        }
    }
}

export default appReducer;
