import *  as React from 'react';
import PlaceInfo from '../models/PlaceInfo';
import PlaceListItem from './PlaceListItem';
import { Paper } from 'material-ui';
import Place from '../models/Place';
import { connect } from 'react-redux';
import AppState from '../redux/state';
import { selectPlace, createPlace } from '../redux/actions-creators';
import PlaceEditor from './PlaceEditor';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import PlacesList from './PlacesList';


interface Props {
    places: Place[];
    selectedPlace: Place;
    selectPlace: (id: number) => any;
    createPlace: () => any;
}

interface State {
    placesList: Array<PlaceInfo>;
    currentPlace: PlaceInfo;
}

class PlacesLayoutBase extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            placesList: [],
            currentPlace: null
        }
    }

    placeSelectHandler(place: PlaceInfo) {
        this.setState({
            currentPlace: place
        })
    }

    render() {
        //const { placesList, currentPlace } = this.state;
        const { places, selectedPlace, selectPlace } = this.props;

        return (
            <React.Fragment>
                <div className="layout__list   list">
                    {
                        places && places.length !== 0 ?
                            <PlacesList/> :
                            <CircularProgress />
                    }
                </div>
                <div className="layout__editor   editor">
                    {
                        selectedPlace ? 
                            <PlaceEditor/> : 
                            <div>Выберите место</div>
                    }
                </div>
            </React.Fragment>
        )
    }

    private createPlaceHandler = () => this.props.createPlace();
}

const PlacesLayout = connect(
    (state: AppState) => ({
        places: state.places,
        selectedPlace: state.selected.place
    }),
    dispatch => ({
        selectPlace: (id: number) => dispatch(selectPlace(id)),
        createPlace: () => dispatch(createPlace())
    })
)(PlacesLayoutBase)

export default PlacesLayout;
