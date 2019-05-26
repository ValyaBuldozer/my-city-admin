import * as React from 'react';
import Place from '../models/Place';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import EditableField from './EditableField';
import { connect } from 'react-redux';
import AppState from '../redux/state';
import { updateSelectedPlace } from '../redux/actions-creators';
import QuizEditor from './QuizEditor';
import PlaceRoutesEditor from './PlaceRoutesEditor';
import { postPlaceUpdate, putNewPlace } from '../redux/thunks';
import { ThunkDispatch } from 'redux-thunk';
import StateAction from '../redux/actions';
import { PlaceLogoEditor } from './LogoEditor';

interface Props {
    place: Place;
    updatePlace: (place: Place) => any;
    savePlace: () => any;
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

    private fieldHandler = (fieldName: FieldType) => value => {
        this.props.updatePlace({ ...this.props.place, [fieldName]: value })
    }

    private saveHandler = () => {
        //uploadFile(this.state.image);
        this.props.savePlace();
    }

    render() {
        const { place, updatePlace } = this.props,
            { image, imageScale } = this.state;

        return (
            <React.Fragment>
                <EditableField
                    text={place.name}
                    label="Название"
                    defaultText='Введите название'
                    type='title'
                    alignment='center'
                    onChange={this.fieldHandler('name')} />
                <EditableField
                    text={place.description}
                    showLabel
                    label="Описание"
                    defaultText='Введите описание'
                    onChange={this.fieldHandler('description')}
                    type='default'
                    alignment='left' />
                <EditableField
                    text={place.address}
                    showLabel
                    label="Адрес"
                    defaultText='Введите адрес'
                    onChange={this.fieldHandler('address')}
                    type='default'
                    alignment='left' />
                <div className="editor__quiz">
                    <QuizEditor />
                </div>
                <div className="editor__routes">
                    <PlaceRoutesEditor />
                </div>
                <div className="editor__avatar">
                    <PlaceLogoEditor />
                </div>
                <div className="editor__save">
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
        place: state.selected.place,
        places: state.places
    }),
    (dispatch: ThunkDispatch<AppState, {}, StateAction>) => ({
        updatePlace: (place: Place) => dispatch(updateSelectedPlace(place)),
        postPlace: () => dispatch(postPlaceUpdate()),
        putNewPlace: () => dispatch(putNewPlace())
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        place: stateProps.place, 
        updatePlace: dispatchProps.updatePlace,
        savePlace: stateProps.places.some(place => place.id === stateProps.place.id) ? 
            dispatchProps.postPlace : 
            dispatchProps.putNewPlace
    })
)(PlaceEditorBase);

export default PlaceEditor;
