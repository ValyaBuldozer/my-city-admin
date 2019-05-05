import * as React from 'react';
import { createStyles } from '@material-ui/core';
import MenuVariant from '../models/util/MenuItem';

const menuStyles = createStyles({
    menu: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    item: {
        widht: '100%',
        height: 100,
        background: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

interface Props {
    current: MenuVariant;
}


