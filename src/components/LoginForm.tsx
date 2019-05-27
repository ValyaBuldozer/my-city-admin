import * as React from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import AppState from '../redux/state';
import { AnyAction } from 'redux';
import { loginUser, registerUser } from '../redux/thunks';

interface Props {
    loginUser: (username: string, password: string) => any;
    registerUser: (username: string, password: string) => any;
}

const LoginFormBase = ({ loginUser, registerUser }: Props) => {
    
    const [username, setUsername] = React.useState(null),
        [password, setPassword] = React.useState(null);

    return (
        <div className='login-wrapper'>
            <Paper className="login-form" elevation={10}>
                <Typography>Вход</Typography>
                <TextField 
                    label='Логин'
                    variant='outlined' 
                    placeholder='Имя пользователя...' 
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>
                <TextField
                    label='Пароль'
                    type='password'
                    variant='outlined'
                    placeholder='Пароль...'
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                <Button 
                    variant='contained' 
                    color='primary'
                    onClick={() => loginUser(username, password)}>
                        Войти
                </Button>
            </Paper>
        </div>
    )
}

const LoginForm = connect(
    () => ({}),
    (dispatch: ThunkDispatch<AppState, {}, AnyAction>): Props => ({
        loginUser: (username, password) => dispatch(loginUser(username, password)),
        registerUser: (username, password) => dispatch(registerUser(username, password))
    })
)(LoginFormBase);

export default LoginForm;
