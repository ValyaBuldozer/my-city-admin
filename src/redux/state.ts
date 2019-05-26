import Place from "../models/Place";
import Route from "../models/Routes";
import NotificationVariant from "../models/util/NotificationVariant";

export default interface AppState {
    places: Place[];
    routes: Route[];
    selected: {
        place: Place;
        route: Route;
    },
    currentNotification: {
        text: string,
        variant: NotificationVariant
    }
}

export const initialState: AppState = {
    places: [],
    routes: [],
    selected: {
        place: null,
        route: null
    },
    currentNotification: null
}
