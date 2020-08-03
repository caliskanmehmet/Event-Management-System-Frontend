import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import QRCodeGenerator from "./QRCodeGenerator";
import CircularIndeterminate from "../CircularIndeterminate";

export default function EnrollDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [inputList, setInputList] = React.useState({});
    const [loading, setLoading] = React.useState(100);

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

    const handleEnroll = () => {
        var obj = JSON.parse(JSON.stringify(inputList));
        var values = Object.keys(obj).map(function (key) { return obj[key]; });
        setLoading(0)

        axios({
            method: 'post',
            url: `http://localhost:8080/enroll/${props.user.username}/${props.event.eventKey}`,
            headers: {"Authorization" : `Bearer ${props.user.accessToken}`},
            data: {
                "answerForm": values
            }
        }).then( res => {
                setLoading(100)
                setOpen(false)
                props.setUpdate(props.update + 1) // trigger a render
            })
            .catch(err => {
                setLoading(100)
                setOpen(false)
            })

    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Kayıt Ol
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Kayıt Ol</DialogTitle>
                <DialogContent>

                    <DialogContentText>

                        {props.event.questions.length === 0 ?
                            <DialogContentText>
                                Etkinliğe katılmak istediğinizden
                                emin misiniz?
                            </DialogContentText>
                            :
                            <DialogContentText>
                                Etkinliğe katılabilmeniz için etkinlik kurucusunun sorduğu soruları
                                cevaplamanız gerekiyor.
                            </DialogContentText>
                        }
                    </DialogContentText>
                    {props.event.questions.map( (question) => (
                        <TextField
                            key={question}
                            margin="dense"
                            onChange={handleChange}
                            id={question}
                            name={question}
                            required={true}
                            label={question}
                            type="email"
                            fullWidth
                        />
                    ))}
                    {loading === 0 ? (<CircularIndeterminate />) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
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