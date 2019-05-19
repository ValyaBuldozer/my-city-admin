import * as React from 'react';
import Answer from '../models/Answer';
import { connect } from 'react-redux';
import AppState from '../redux/state';
import { updatePlace, createAnswer } from '../redux/actions';
import Place from '../models/Place';
import { Paper } from '@material-ui/core';
import EditableField from './EditableField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import QuizAnswer from './QuizAnswer';

interface StateProps {
    title: string;
    answers: Answer[];
}

interface DispatchProps {
    updateTitle: (title: string) => any;
    addAnswer: () => any;
}

interface Props extends StateProps, DispatchProps {}

const QuizEditorBase = ({ title, answers, updateTitle, addAnswer }: Props) => {
    return (
        <Paper className="quiz-editor" elevation={5}>
            <EditableField
                text={title}
                type="title"
                alignment="center"
                onChange={title => updateTitle(title)}/>
            {
                answers.map(({id}) => <QuizAnswer id={id} key={id}/>)
            }
            <Fab color='primary' arial-label='Add' onClick={() => addAnswer()}>
                <AddIcon />
            </Fab>
        </Paper>
    )
}

interface ContainerDispatch {
    updatePlace: (place: Place) => any;
    addAnswer: () => any;
}

const QuizEditor = connect(
    (state: AppState) => ({
        place: state.selected.place
    }),
    (dispatch): ContainerDispatch => ({
        updatePlace: (place: Place) => dispatch(updatePlace(place)),
        addAnswer: () => dispatch(createAnswer())
    }),
    ({place}, {updatePlace, addAnswer}): Props => ({
        title: place.question_title,
        answers: place.answers,
        addAnswer,
        updateTitle: title => updatePlace({...place, question_title: title})
    })
)(QuizEditorBase);

export default QuizEditor;
