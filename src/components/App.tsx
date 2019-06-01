import * as React from 'react';
import BaseLayout from './BaseLayout';
import '../styles/styles.scss';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import AppState from '../redux/state';
import { fetchPlaces, fetchRoutes } from '../redux/thunks';
import StateAction from '../redux/actions';
import NotificationHandler from './NotificationHandler';
import { SnackbarProvider } from 'notistack';
import LoginForm from './LoginForm';

interface AppProps {
    token: string;
    fetchData: () => any;
}

class AppBase extends React.Component<AppProps> {

    render() {
        return (
            <div className='root'>
                <SnackbarProvider maxSnack={3}>
                    <NotificationHandler>
                        {
                            this.props.token ? 
                                <BaseLayout/> : 
                                <LoginForm/>
                        }
                    </NotificationHandler>
                </SnackbarProvider>
            </div>
        )
    }

    componentDidUpdate(prevProps: AppProps) {
        if (this.props.token !== prevProps.token) {
            this.props.fetchData();
        }
    }

    componentDidMount() {
        if (this.props.token) {
            this.props.fetchData();
        }
    }
}

const App = connect(
    ({token}: AppState) => ({
        token
    }),
    (dispatch: ThunkDispatch<AppState, {}, StateAction>) => ({
        fetchData: () => {
            dispatch(fetchPlaces())
            dispatch(fetchRoutes())
        }
    })
)(AppBase);

export default App;
