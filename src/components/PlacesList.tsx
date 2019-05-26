import * as React from 'react';
import Place from '../models/Place';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import AppState from '../redux/state';
import { ThunkDispatch } from 'redux-thunk';
import StateAction from '../redux/actions';
import { selectPlace, createPlace } from '../redux/actions-creators';
import { deletePlace } from '../redux/thunks';

interface StateProps {
    places: Place[];
    selectedId: number;
}

interface DispatchProps {
    createPlace: () => any;
    removePlace: (id: number) => any;
    selectPlace: (id: number) => any;
}

interface Props extends StateProps, DispatchProps {}

const PlacesListBase = ({ places, createPlace, removePlace, selectPlace, selectedId }: Props) => {

    return (
        <List>
            {
                places.map(place => (
                    <ListItem 
                        selected={place.id === selectedId} 
                        onClick={() => selectPlace(place.id)}>
                        <ListItemAvatar>
                            <Avatar src={place.logo_path}/>
                        </ListItemAvatar>
                        <ListItemText>
                            {place.name}
                        </ListItemText>
                        <ListItemSecondaryAction>
                        <IconButton 
                            aria-label="Delete"
                            onClick={(e: React.MouseEvent) => {
                                removePlace(place.id);
                                e.stopPropagation();
                            }}>
                            <DeleteIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            }
             <Button variant="contained" color="primary" onClick={() => createPlace()}>
                Добавить место
            </Button>
        </List>
    )
}

const PlacesList = connect(
    (state: AppState): StateProps => ({
        places: state.places,
        selectedId: state.selected.place && state.selected.place.id
    }),
    (dispatch: ThunkDispatch<AppState, {}, StateAction>): DispatchProps => ({
        selectPlace: id => dispatch(selectPlace(id)),
        createPlace: () => dispatch(createPlace()),
        removePlace: id => dispatch(deletePlace(id))
    })
)(PlacesListBase);

export default PlacesList;
