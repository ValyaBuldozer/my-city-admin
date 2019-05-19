export default interface Route {
    id: number;
    name: string;
    logo_path: string;
    places: Array<number>;
}

export function isRoute(obj: any): obj is Route {
    return typeof obj.id === 'number'
        && typeof obj.name === 'string'
        && typeof obj.logo_path === 'string'
        && Array.isArray(obj.places);
}

export function isRoutesArray(obj: any): obj is Array<Route> {
    return Array.isArray(obj) && obj.every(route => isRoute(route));
}
