import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import StateAction from '../redux/actions';
import AppState from '../redux/state';
import { uploadPlaceImage, uploadPlaceLogo } from '../redux/thunks';
// I have no idea, why it doesn't work with es6 imports...
// https://github.com/mosch/react-avatar-editor/issues/263
const AvatarEditor = require('react-avatar-editor');
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { showNotification } from '../redux/actions-creators';


interface OwnProps {
}

interface StateProps {
    imagePath: string;
    logoPath: string;
}

interface DispatchProps {
    uploadLogo: (file: File) => any;
    uploadImage: (file: File) => any;
    onError: (error: string) => any;
}

interface Props extends OwnProps, StateProps, DispatchProps { }

interface State {
    logo: File;
    image: File;
    imageScale: number;
}

class LogoEditorBase extends React.Component<Props, State> {

    private editor = React.createRef<typeof AvatarEditor>();

    constructor(props: Props) {
        super(props);

        this.state = {
            image: null,
            logo: null,
            imageScale: 50
        }
    }

    render() {
        const { imagePath, logoPath } = this.props,
            { image, imageScale } = this.state;

        return (
            <div className="logo-editor">
                <div className="logo-editor__title">
                    <Typography>Выбор логотипа и картинки</Typography>
                </div>
                <div className="logo-editor__upload-wrapper">
                    <input type='file' onChange={this.fileHandler} className="logo-editor__upload_item" />
                    <div className="logo-editor__upload-item">
                        <Button variant="outlined" color="primary" onClick={this.saveLogo}>
                            Сохранить логотип
                        </Button>
                    </div>
                    <div className="logo-editor__upload_item">
                        <Button variant="outlined" color="primary" onClick={this.saveImage}>
                            Сохранить изображение
                        </Button>
                    </div>
                </div>
                <div className="logo_editor__picker">
                    <AvatarEditor
                        ref={this.editor}
                        height={400}
                        width={400}
                        image={imagePath}
                        scale={imageScale / 100 + 0.7} />
                </div>
                <div className="logo-editor__slider-wrapper">
                    <div className="logo-editor__slider">
                        <Slider
                            value={imageScale}
                            onChange={this.sliderHandler} />
                    </div>
                </div>
            </div>
        )
    }

    private fileHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const file = Array.from(e.currentTarget.files)[0];

        this.setState({ image: file })
    }


    private sliderHandler = (event, scaleValue: number) => {
        this.setState({ imageScale: scaleValue })
    }

    private saveLogo = () => {
        if (!this.props.imagePath && !this.state.image) {
            this.props.onError('Выберите файл для загрузки.');
            return;
        }

        const canvas = this.editor.current.getImage();

        canvas.toBlob(blob => {
            const file = new File([blob], 'logo.jpeg');
            this.props.uploadLogo(file);
        }, 'image/jpeg', 1);
    }

    private saveImage = () => {
        if (!this.state.image) {
            this.props.onError('Выберите файл для загрузки.');
            return;
        }

        this.props.uploadImage(this.state.image);
    }
}

export const PlaceLogoEditor = connect(
    (state: AppState): StateProps => ({
        imagePath: state.selected.place.image_path,
        logoPath: state.selected.place.logo_path
    }),
    (dispatch: ThunkDispatch<AppState, {}, StateAction>): DispatchProps => ({
        uploadLogo: file => dispatch(uploadPlaceLogo(file)),
        uploadImage: file => dispatch(uploadPlaceImage(file)),
        onError: err => dispatch(showNotification(err, 'error'))
    })
)(LogoEditorBase);

