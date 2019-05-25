import * as React from 'react';
import BaseLayout from './BaseLayout';
import '../styles/styles.scss';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import AppState from '../redux/state';
import { fetchPlaces, fetchRoutes, fetchData } from '../redux/thunks';
import StateAction from '../redux/actions';
import NotificationHandler from './NotificationHandler';
import { SnackbarProvider } from 'notistack';

interface AppProps {
    fetchData: () => any;
}

class AppBase extends React.Component<AppProps> {

    render() {
        return (
            <div className='root'>
                <SnackbarProvider maxSnack={3}>
                    <NotificationHandler>
                        <BaseLayout/>
                    </NotificationHandler>
                </SnackbarProvider>
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchData();
    }
}

const App = connect(
    () => ({}),
    (dispatch: ThunkDispatch<AppState, {}, StateAction>) => ({
        fetchData: () => dispatch(fetchData())
    })
)(AppBase);

export default App;
