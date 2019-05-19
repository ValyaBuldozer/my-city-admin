import Place from "../models/Place";
import Route from "../models/Routes";

export default interface AppState {
    places: Place[];
    routes: Route[];
    selected: {
        place: Place;
        route: Route;
    }
}

export const initialState: AppState = {
    places: [],
    routes: [],
    selected: {
        place: null,
        route: null
    }
}
