import AppState, { initialState } from "./state";
import uid from "../util/uid";
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

        case ActionType.UPDATE_SELECTED_PLACE: {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    place: { ...action.place, id: state.selected.place.id }
                }
            }
        }

        case ActionType.UPDATE_SELECTED_ROUTE: {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    route: { ...action.route, id: state.selected.route.id }
                }
            }
        }

        case ActionType.UPDATE_PLACE: {
            return {
                ...state,
                places: state.places.map(place => place.id == action.place.id ? action.place : place)
            }
        }

        case ActionType.UPDATE_ROUTE: {
            return {
                ...state, 
                routes: state.routes.map(route => route.id == action.route.id ? action.route : route)
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

        case ActionType.ADD_PLACE: {
            return {
                ...state,
                places: [ ...state.places, action.place ]
            }
        }

        case ActionType.ADD_ROUTE: {
            return {
                ...state,
                routes: [ ...state.routes, action.route ]
            }
        }

        case ActionType.REMOVE_PLACE: {
            return {
                ...state,
                places: state.places.filter(place => place.id !== action.id)
            }
        }

        case ActionType.REMOVE_ROUTE: {
            return {
                ...state,
                routes: state.routes.filter(route => route.id !== action.id)
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
                                answer
                            )
                    }
                }
            }
        }

        case ActionType.ADD_PLACE_ROUTE: {
            const route = state.routes.find(route => route.id === action.id)

            return {
                ...state,
                selected: {
                    ...state.selected,
                    place: {
                        ...state.selected.place,
                        routes: route ? [...state.selected.place.routes, route] : state.selected.place.routes
                    }
                }
            }
        }

        case ActionType.REMOVE_PLACE_ROUTE: {
            return {
                ...state, 
                selected: {
                    ...state.selected,
                    place: {
                        ...state.selected.place,
                        routes: state.selected.place.routes.filter(route => route.id !== action.id)
                    }
                }
            }
        }

        case ActionType.SET_NOTIFICATION: {
            return {
                ...state, 
                currentNotification: {
                    ...action
                }
            }
        }

        case ActionType.CREATE_PLACE: {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    place: {
                        id: state.places.reduce((maxId, place) => place.id > maxId ? place.id : maxId, Number.MIN_VALUE) + 1,
                        name: '',
                        description: '',
                        address: '',
                        image_path: '',
                        logo_path: '',
                        question_title: '',
                        answers: [],
                        routes: []
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
