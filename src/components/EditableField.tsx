import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import { createBlock } from '../util/classnames';

interface Props {
    text: string;
    label?: string;
    type: 'title' | 'default';
    alignment: 'left' | 'center';
    onChange: (newValue: string) => any;
}

interface State {
    text: string;
    isEditing: boolean;
}

export default class EditableField extends React.Component<Props, State> {

    private root = React.createRef<HTMLDivElement>();
    
    constructor(props: Props) {
        super(props);

        this.state = {
            text: props.text,
            isEditing: false
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.onOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onOutsideClick);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.text !== this.props.text) {
            this.setState({ 
                text: this.props.text ,
                isEditing: false
            })
        }
    }

    render() {
        const { type, alignment, label } = this.props,
            { text, isEditing } = this.state;

        return  (
            <div className={createBlock('editable-field', null, alignment)} 
                ref={this.root}
                onDoubleClick={this.onDoubleClick}>
                {
                    isEditing ? 
                        <TextField 
                            className={createBlock('editable-field', 'input')}
                            label={label}
                            value={text}
                            onChange={this.onChange}
                            multiline/>
                        :
                        <Typography className={createBlock('editable-field', 'text', type)}>{text}</Typography>
                }
            </div>  
        )
    }

    private onDoubleClick = e => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    private onChange = e => {
        this.setState({
            text: e.target.value
        });

        this.props.onChange(e.target.value);
    }

    private onOutsideClick = e => {
        if (this.root && !this.root.current.contains(e.target) && this.state.isEditing) {
            this.setState({
                isEditing: false
            })
        }
    }
}
