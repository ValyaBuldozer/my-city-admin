import * as React from 'react';
import { connect } from 'react-redux';
import AppState from '../redux/state';
import { withSnackbar } from 'notistack';

interface Props {
    currentNotification: String;
    children: React.ReactNode;
    enqueueSnackbar: (text: string) => any;
    closeSnackbar: () => any;
}

class NotificationHandlerBase extends React.Component<Props> {

    componentDidUpdate(prevProps: Props) {
        if (this.props.currentNotification !== prevProps.currentNotification) {
            this.props.enqueueSnackbar(this.props.currentNotification.toString());
        }
    }

    render() {
        return this.props.children;
    }
}

const NotificationHandlerContainer = connect(
    (state: AppState) => ({
        currentNotification: state.currentNotification
    }),
    dispatch => ({})
)(NotificationHandlerBase)

const NotificationHandler = withSnackbar(NotificationHandlerContainer)

export default NotificationHandler;
