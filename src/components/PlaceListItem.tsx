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
            className="list-item" 
            elevation={3} 
            onClick={() => onSelect()}>
            <Avatar 
                src={place.logo_path} 
                className="list-item-logo"/>
            <div className="list-item-title">
                { place.name }
            </div>
        </Paper>
    )
}

export default PlaceListItem;