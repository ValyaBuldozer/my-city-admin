import PlaceInfo from "./PlaceInfo";
import Answer from "./Answer";

export default interface Place {
    id: number;
    name: string;
    logo_path: string;
    image_path: string;
    description: string;
    question_title: string;
    address: string;
    routes: Array<PlaceInfo>;
    answers: Array<Answer>;
}