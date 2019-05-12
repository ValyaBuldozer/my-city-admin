import * as React from 'react';
import MenuVariant from '../models/util/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlacesLayout from './PlacesLayout';


interface State {
    currentMenuItem: MenuVariant;
    menuAnchorElement: React.ReactNode;
}

export default class BaseLayout extends React.Component<{}, State> {

    state = {
        currentMenuItem: MenuVariant.PLACES,
        menuAnchorElement: null
    }

    private handleMenuClick = (event) => {
        this.setState({ menuAnchorElement: event.currentTarget })
    }

    private handleMenuClose = () => {
        this.setState({ menuAnchorElement: null })
    }

    private selectMenuElement(element: MenuVariant) {
        this.setState({ currentMenuItem: element, menuAnchorElement: null })
    }

    render() {
        const { menuAnchorElement, currentMenuItem } = this.state;

        return (
            <div className="layout">
                <List component="nav" className="layout__header">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="When device is locked"
                        onClick={this.handleMenuClick}
                    >
                        <ListItemText
                            primary={currentMenuItem}
                        />
                    </ListItem>
                </List>
                <Menu
                    anchorEl={menuAnchorElement}    
                    open={Boolean(menuAnchorElement)}
                    onClose={this.handleMenuClose}>
                    <MenuItem onClick={() => this.selectMenuElement(MenuVariant.PLACES)}>Места</MenuItem>
                    <MenuItem onClick={() => this.selectMenuElement(MenuVariant.ROUTES)}>Маршруты</MenuItem>
                </Menu>
                {
                    currentMenuItem == MenuVariant.PLACES ? 
                        <PlacesLayout/>
                        : <div/>
                }
            </div>
        )
    }
}
