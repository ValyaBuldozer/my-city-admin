import Answer from "./Answer";
import Route from "./Routes";

export default interface Place {
    id: number;
    name: string;
    logo_path: string;
    image_path: string;
    description: string;
    question_title: string;
    address: string;
    routes: Array<Route>;
    answers: Array<Answer>;
}

export function isPlace(obj: any): obj is Place {
    return typeof obj.id === 'number' 
        && typeof obj.name === 'string' 
        && typeof obj.logo_path === 'string'
        && typeof obj.image_path === 'string'
        && Array.isArray(obj.routes)
        && Array.isArray(obj.answers); 
}

export function isPlacesArray(obj: any): obj is Array<Place> {
    return Array.isArray(obj) && obj.every(place => isPlace(place));
}
