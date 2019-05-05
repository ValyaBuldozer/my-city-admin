import * as React from 'react';
import PlaceInfo from '../models/PlaceInfo';
import Avatar from '@material-ui/core/Avatar';
import Paper  from '@material-ui/core/Paper';

interface Props {
    place: PlaceInfo;
    onSelect: () => any;
}

const PlaceListItem = ({ place, onSelect }: Props) => {



    return (
        <Paper 
            className="place-item" 
            elevation={3} 
            onClick={() => onSelect()}>
            <Avatar 
                src={place.logo_path} 
                className="place-item-logo"/>
            <div className="place-item-title">
                { place.name }
            </div>
        </Paper>
    )
}

export default PlaceListItem;