import * as React from 'react';
import BaseLayout from './BaseLayout';
import '../styles/styles.scss';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import StateAction from '../redux/actions';
import AppState from '../redux/state';
import { fetchPlaces, fetchRoutes } from '../redux/thunks';

interface AppProps {
    fetchPlaces: () => any;
    fetchRoutes: () => any;
}

class AppBase extends React.Component<AppProps> {

    render() {
        return (
            <div className='root'>
                <BaseLayout/>
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchPlaces();
        this.props.fetchRoutes();
    }
}

const App = connect(
    () => ({}),
    (dispatch: ThunkDispatch<AppState, {}, StateAction>) => ({
        fetchPlaces: () => dispatch(fetchPlaces()),
        fetchRoutes: () => dispatch(fetchRoutes())
    })
)(AppBase);

export default App;
