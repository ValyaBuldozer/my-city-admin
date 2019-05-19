import *  as React from 'react';
import PlaceInfo from '../models/PlaceInfo';
import PlaceListItem from './PlaceListItem';
import { Paper } from 'material-ui';
import Place from '../models/Place';
import { connect } from 'react-redux';
import AppState from '../redux/state';

interface Props {
    places: Place[];
    selectedPlace: Place;
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

    componentDidMount() {
        // fetch('/places')
        //     .then(body => body.json())
        //     .then(placesList => {
        //         this.setState({ placesList })
        //     })
        //     .catch(e => console.error(e))
    }

    placeSelectHandler(place: PlaceInfo) {
        this.setState({
            currentPlace: place
        })
    }

    render() {
        //const { placesList, currentPlace } = this.state;
        const { places, selectedPlace } = this.props;

        return (
            <React.Fragment>
                <div className="layout__list   list">
                    {
                        places ?
                            places.map(place => 
                                <PlaceListItem 
                                    key={place.id} 
                                    place={place} 
                                    onSelect={() => this.placeSelectHandler(place)}/>
                            ) :
                            <p>Loading places...</p>
                    }
                </div>
                <div className="layout__editor   editor">
                </div>
            </React.Fragment>
        )
    }
}

const PlacesLayout = connect(
    (state: AppState): Props => ({
        places: state.places,
        selectedPlace: state.selected.place
    }),
    dispatch => ({})
)(PlacesLayoutBase)

export default PlacesLayout;
