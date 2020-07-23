import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

export default function EnrollDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [inputList, setInputList] = React.useState({});

    const handleChange = (event) => {
        const newInputList = {...inputList}
        newInputList[event.target.name] = event.target.value
        setInputList(newInputList)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const options = {
        data: {},
        headers: {"Authorization" : `Bearer ${props.user.accessToken}`}
    }

    const data = []

    const handleEnroll = () => {
        var obj = JSON.parse(JSON.stringify(inputList));
        var values = Object.keys(obj).map(function (key) { return obj[key]; });

        axios({
            method: 'post',
            url: `http://localhost:8080/enroll/${props.user.username}/${props.event.eventKey}`,
            headers: {"Authorization" : `Bearer ${props.user.accessToken}`},
            data: {
                "answerForm": values
            }
        }).then( res => {
                setOpen(false)
                props.setUpdate(props.update + 1) // trigger a render
            })
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Enroll
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Etkinliğe katılabilmeniz için etkinlik kurucusunun sorduğu soruları
                        cevaplamanız gerekiyor.
                    </DialogContentText>
                    {props.event.questions.map( (question) => (
                        <TextField
                            autoFocus
                            margin="dense"
                            onChange={handleChange}
                            id={question}
                            name={question}
                            label={question}
                            type="email"
                            fullWidth
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        İptal Et
                    </Button>
                    <Button onClick={handleEnroll} color="primary">
                        Kayıt Ol
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}