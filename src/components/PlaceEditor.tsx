import * as React from 'react';
import { uploadFile } from '../util/fetch';
import Place from '../models/Place';
import PlaceInfo from '../models/PlaceInfo';
import Answer from '../models/Answer';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import EditableField from './EditableField';
import { connect } from 'react-redux';
import AppState from '../redux/state';
import { updatePlace } from '../redux/actions';
import QuizEditor from './QuizEditor';
import PlaceRoutesEditor from './PlaceRoutesEditor';
// I have no idea, why it doesn't work with es6 imports...
// https://github.com/mosch/react-avatar-editor/issues/263
const AvatarEditor = require('react-avatar-editor');

interface Props {
    place: Place;
    updatePlace: (place: Place) => any;
}

interface State {
    image: File;
    imageScale: number;
}

type FieldType = 'name' | 'logo_path' | 'description' | 'question_title' | 'address' | 'routes' | 'answers';

class PlaceEditorBase extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
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
        this.props.updatePlace({ ...this.props.place, [fieldName]: e.target.value })
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
        const { place, updatePlace } = this.props,
            { image, imageScale } = this.state;

        if (!place) {
            return <div>Выберите место</div>
        }
        
        return (
            <React.Fragment>
                <EditableField
                    text={place.name}
                    label="Название"
                    type='title'
                    alignment='center'
                    onChange={this.fieldHandler('name')}/>
                <EditableField
                    text={place.description}
                    showLabel
                    label="Описание"
                    onChange={this.fieldHandler('description')}
                    type='default'
                    alignment='left'/>
                <EditableField
                    text={place.address}
                    showLabel
                    label="Адрес"
                    onChange={this.fieldHandler('address')}
                    type='default'
                    alignment='left'/>
                <div className="editor__quiz">
                    <QuizEditor/>
                </div>
                <div className="editor__routes">
                    <PlaceRoutesEditor/>
                </div>
                <div className="editor__avatar">
                    <input type='file' onChange={this.fileHandler}/>       
                    <AvatarEditor
                        height={400}
                        width={400}
                        image={image ? image : place.image_path}
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

const PlaceEditor = connect(
    (state: AppState) => ({
        place: state.selected.place
    }),
    dispatch => ({
        updatePlace: (place: Place) => dispatch(updatePlace(place))
    })
)(PlaceEditorBase);

export default PlaceEditor;
