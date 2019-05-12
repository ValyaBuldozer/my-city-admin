import * as React from 'react';
import BaseLayout from './BaseLayout';
import '../styles/styles.scss';

export default class App extends React.Component {

    render() {
        return (
            <div className='root'>
                <BaseLayout/>
            </div>
        )
    }
}
