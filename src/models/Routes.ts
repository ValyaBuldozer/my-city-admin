import PlaceInfo from "./PlaceInfo";

export default interface Route {
    id: number;
    name: string;
    logo_path: string;
    places: Array<PlaceInfo>;
}