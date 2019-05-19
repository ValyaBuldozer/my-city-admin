import AppState, { initialState } from "./state";
import StateAction, { ActionType } from "./actions";
import uid from "../util/uid";

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

        case ActionType.UPDATE_PLACE: {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    place: { ...action.place, id: state.selected.place.id }
                }
            }
        }

        case ActionType.UPDATE_ROUTE: {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    route: { ...action.route, id: state.selected.route.id }
                }
            }
        }

        case ActionType.CREATE_ANSWER: {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    place: {
                        ...state.selected.place,
                        answers: [
                            ...state.selected.place.answers, 
                            {
                                id: uid(),
                                title: '',
                                description: '',
                                is_right: false
                            }
                        ]
                    }
                }
            }
        }

        case ActionType.REMOVE_ANSWER: {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    place: {
                        ...state.selected.place,
                        answers: state.selected.place.answers.filter(answer => answer.id != action.id)
                    }
                }
            }
        }

        case ActionType.UPDATE_ANSWER: {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    place: {
                        ...state.selected.place,
                        answers: state.selected.place.answers.map(answer => answer.id === action.answer.id ? 
                            { ...action.answer } :
                            answer)
                    }
                }
            }
        }

        default: {
            return state;
        }
    }
}

export default appReducer;
