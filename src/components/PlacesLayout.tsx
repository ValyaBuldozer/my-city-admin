import *  as React from 'react';
import PlaceInfo from '../models/PlaceInfo';
import PlaceListItem from './PlaceListItem';
import { Paper } from 'material-ui';
import PlaceEditor from './PlaceEditor';

interface State {
    placesList: Array<PlaceInfo>;
    currentPlace: PlaceInfo;
}

export default class PlacesLayout extends React.Component<{}, State> {

    constructor(props) {
        super(props);

        this.state = {
            placesList: [],
            currentPlace: null
        }
    }

    componentDidMount() {
        fetch('/places')
            .then(body => body.json())
            .then(placesList => {
                this.setState({ placesList })
            })
            .catch(e => console.error(e))
    }

    placeSelectHandler(place: PlaceInfo) {
        this.setState({
            currentPlace: place
        })
    }

    render() {
        const { placesList, currentPlace } = this.state;

        return (
            <div className="places">
                <div className="places-list">
                    {
                        placesList.map(place => 
                            <PlaceListItem 
                                key={place.id} 
                                place={place} 
                                onSelect={() => this.placeSelectHandler(place)}/>
                        )
                    }
                </div>
                <div className="places-content">
                    {
                        currentPlace ? 
                            <PlaceEditor id={currentPlace.id}/> :
                            <div/>
                    }
                </div>
            </div>
        )
    }
}
