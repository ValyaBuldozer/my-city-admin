import * as React from 'react';
import { fetchData, uploadFile } from '../util/fetch';
import Place from '../models/Place';
import PlaceInfo from '../models/PlaceInfo';
import Answer from '../models/Answer';
import TextField from '@material-ui/core/TextField';
import EditableField from './EditableField';

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

type FieldType = 'name' | 'logo_path' | 'description' | 'question_title' | 'address' | 'routes' | 'answers';

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

    private fieldHandler = (fieldName: FieldType) => e => {
        this.setState({ ...this.state, [fieldName]: e.target.value })
    }

    private fileHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const file = Array.from(e.currentTarget.files)[0];

        uploadFile(file);
    }

    render() {
        const { name, description, address } = this.state;
        
        return (
            <React.Fragment>
                <EditableField
                    text={name}
                    label="Название"
                    type='title'
                    alignment='center'
                    onChange={this.fieldHandler('name')}/>
                <EditableField
                    text={description}
                    label="Описание"
                    onChange={this.fieldHandler('description')}
                    type='default'
                    alignment='left'/>
                <EditableField
                    text={address}
                    label="Адрес"
                    onChange={this.fieldHandler('address')}
                    type='default'
                    alignment='left'/>
                    <div>
                <input type='file' onChange={this.fileHandler}/>
                </div>
            </React.Fragment>
        )
    }
}
