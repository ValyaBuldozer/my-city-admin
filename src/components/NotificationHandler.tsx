import * as React from 'react';
import { connect } from 'react-redux';
import AppState from '../redux/state';
import { withSnackbar } from 'notistack';
import NotificationVariant from '../models/util/NotificationVariant';

interface Props {
    currentNotification: { text: string, variant: NotificationVariant };
    children: React.ReactNode;
    enqueueSnackbar: (text: string, params: any) => any;
    closeSnackbar: () => any;
}

class NotificationHandlerBase extends React.Component<Props> {

    componentDidUpdate(prevProps: Props) {
        if (this.props.currentNotification !== prevProps.currentNotification) {
            const { text, variant } = this.props.currentNotification;
            this.props.enqueueSnackbar(text, { variant });
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
