import * as React from 'react';
import Answer from '../models/Answer';
import { connect } from 'react-redux';
import AppState from '../redux/state';
import { updateAnswer } from '../redux/actions-creators';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import EditableField from './EditableField';

interface OwnProps {
    id: number;
}

interface StateProps {
    answer: Answer;
}

interface DispatchProps {
    updateTitle: (titile: string) => any;
    updateIsRight: (isRight: boolean) => any;
    updateDescription: (description: string) => any;
}

interface Props extends StateProps, DispatchProps {}

const QuizAnswerBase = ({answer, updateDescription, updateIsRight, updateTitle}: Props) => {
    console.log(answer.is_right)
    return (
        <Paper className="quiz-answer" elevation={3}>
            <div className="quiz-answer__title">
                <EditableField
                    label="Ответ"
                    showLabel
                    text={answer.title}
                    type="default"
                    alignment="left"
                    onChange={title => updateTitle(title)}/>
            </div>
            <Checkbox 
                className="quiz-answer__is-right"
                checked={answer.is_right}
                color="primary"
                onChange={() => updateIsRight(!answer.is_right)}/>
            <div className="quiz-answer__description">
                <EditableField
                    label="Описание"
                    showLabel
                    text={answer.description}
                    type="default"
                    alignment="left"
                    onChange={description => updateDescription(description)}/>
            </div>
        </Paper>
    )
}

interface ContainerDispatch {
    updateAnswer: (answer: Answer) => any;
}

const QuizAnswer = connect(
    (state: AppState, ownProps: OwnProps): StateProps => ({
        answer: state.selected.place.answers.find(answer => answer.id === ownProps.id)
    }),
    (dispatch): ContainerDispatch => ({
        updateAnswer: (answer: Answer) => dispatch(updateAnswer(answer))
    }),
    (stateProps: StateProps, {updateAnswer}: ContainerDispatch): Props => ({
        ...stateProps,
        updateTitle: (title: string) => updateAnswer({...stateProps.answer, title}),
        updateDescription: (description) => updateAnswer({...stateProps.answer, description}),
        updateIsRight: (is_right: boolean) => updateAnswer({...stateProps.answer, is_right})
    })
)(QuizAnswerBase);

export default QuizAnswer;
