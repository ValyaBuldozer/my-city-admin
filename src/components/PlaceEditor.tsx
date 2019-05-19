import * as React from 'react';
import { fetchData, uploadFile } from '../util/fetch';
import Place from '../models/Place';
import PlaceInfo from '../models/PlaceInfo';
import Answer from '../models/Answer';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import EditableField from './EditableField';
// I have no idea, why it doesn't work with es6 imports...
// https://github.com/mosch/react-avatar-editor/issues/263
const AvatarEditor = require('react-avatar-editor');

interface Props {
    place: Place;
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

    image: File;
    imageScale: number;
}

type FieldType = 'name' | 'logo_path' | 'description' | 'question_title' | 'address' | 'routes' | 'answers';

class PlaceEditorBase extends React.Component<Props, State> {

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
            answers: [],
            image: null,
            imageScale: 50
        }
    }

    // fetchPlace() {
    //     fetchData(`/places/${this.props.id}`, (place: Place) => {
    //         this.setState({
    //             ...this.state,
    //             ...place
    //         })
    //     })
    // }

    // componentDidUpdate(prevProps: Props) {
    //     if (prevProps.id != this.props.id) {
    //         this.fetchPlace();
    //     }
    // }

    // componentDidMount() {
    //     this.fetchPlace();
    // }

    private fieldHandler = (fieldName: FieldType) => e => {
        this.setState({ ...this.state, [fieldName]: e.target.value })
    }

    private fileHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const file = Array.from(e.currentTarget.files)[0];

        this.setState({ image: file })
    }

    private saveHandler = () => {
        uploadFile(this.state.image);
    }

    private sliderHandler = (event, scaleValue: number) => {
        this.setState({ imageScale: scaleValue })
    }

    render() {
        const { name, description, address, image, image_path, imageScale } = this.state;
        
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
                    showLabel
                    label="Описание"
                    onChange={this.fieldHandler('description')}
                    type='default'
                    alignment='left'/>
                <EditableField
                    text={address}
                    showLabel
                    label="Адрес"
                    onChange={this.fieldHandler('address')}
                    type='default'
                    alignment='left'/>
                <div className="editor__avatar">
                    <input type='file' onChange={this.fileHandler}/>       
                    <AvatarEditor
                        height={400}
                        width={400}
                        image={image ? image : image_path}
                        scale={imageScale / 100}/>
                    <div className="editor__slider">
                        <Slider 
                            value={imageScale}
                            onChange={this.sliderHandler}/>
                    </div>
                    <Button 
                        variant='contained'
                        onClick={this.saveHandler}>
                        Save
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}
