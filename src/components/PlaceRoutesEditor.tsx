import * as React from 'react';
import Typography from '@material-ui/core/Typography'
import PlaceInfo from '../models/PlaceInfo';
import { connect } from 'react-redux';
import AppState from '../redux/state';
import Route from '../models/Routes';
import { addPlaceRoute, removePlaceRoute } from '../redux/actions-creators';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';

interface StateProps {
    placeRoutes: Route[];
    allRoutes: Route[];
}

interface DispatchProps {
    addRoute: (id: number) => any;
    removeRoute: (id: number) => any;
}

interface Props extends StateProps, DispatchProps {}

const PlaceRoutesEditorBase = ({ placeRoutes, addRoute, removeRoute, allRoutes }: Props) => {
    return (
        <Paper className='place-routes' elevation={7}>
            <Typography className='place-routes__title' variant='title'>Маршруты</Typography>
            <List className='place-routes__list'>
                {
                    allRoutes.map(route => {
                        const isEnabled = Boolean(placeRoutes.find(placeRoute => placeRoute.id === route.id));

                        return (
                            <ListItem className='place-routes__item' key={route.id}>
                                <ListItemAvatar>
                                    <Avatar src={route.logo_path}/>
                                </ListItemAvatar>
                                <ListItemText primary={route.name}/> 
                                <ListItemSecondaryAction>
                                    <Checkbox 
                                        color='primary'
                                        checked={isEnabled}
                                        onChange={() => isEnabled ? removeRoute(route.id) : addRoute(route.id)}/>
                                </ListItemSecondaryAction>               
                            </ListItem>
                        )
                    })
                }
            </List>
        </Paper>
    )
}

const PlaceRoutesEditor = connect(
    (state: AppState): StateProps => ({
        placeRoutes: state.selected.place.routes,
        allRoutes: state.routes
    }),
    (dispatch): DispatchProps => ({
        addRoute: (id: number) => dispatch(addPlaceRoute(id)),
        removeRoute: (id: number) => dispatch(removePlaceRoute(id))
    })
)(PlaceRoutesEditorBase);

export default PlaceRoutesEditor;
