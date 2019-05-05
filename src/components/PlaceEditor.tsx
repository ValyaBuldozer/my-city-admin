import * as React from 'react';
import { fetchData } from '../util/fetch';
import Place from '../models/Place';
import PlaceInfo from '../models/PlaceInfo';
import Answer from '../models/Answer';
import TextField from '@material-ui/core/TextField';

interface Props {
    id: number;
}

interface State {
    name: string;
    logo_path: string;
    image_path: string;
    description: string;
    question_title: string;
    address: string;
    routes: Array<PlaceInfo>;
    answers: Array<Answer>;
}

export default class PlaceEditor extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            logo_path: '',
            image_path: '',
            description: '',
            question_title: '',
            address: '',
            routes: [],
            answers: []
        }
    }

    fetchPlace() {
        fetchData(`/places/${this.props.id}`, (place: Place) => {
            this.setState({
                ...this.state,
                ...place
            })
        })
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.id != this.props.id) {
            this.fetchPlace();
        }
    }

    componentDidMount() {
        this.fetchPlace();
    }

    nameHandler = e => {
        this.setState({ name: e.target.value });
    }

    render() {
        const { name } = this.state;
        
        return (
            <div className="editor">
                <div className="editor-field">
                    <TextField 
                        label="Название"
                        value={name}
                        onChange={this.nameHandler}/>
                </div>
            </div>
        )
    }
}
