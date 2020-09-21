import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditEventDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [inputList, setInputList] = React.useState(
        {"title": props.event.title,
                "quota": props.event.quota,
                "eventKey": props.event.eventKey,
        });
    const [questionCount, setQuestionCount] = React.useState(props.event.questions.length);
    const [startingDate, handleStartingDateChange] = React.useState(props.event.beginningTime);
    const [endingDate, handleEndingDateChange] = React.useState(props.event.endingTime);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleChange = (event) => {
        const newInputList = {...inputList}
        console.log(startingDate)
        newInputList[event.target.name] = event.target.value
        console.log(newInputList)
        setInputList(newInputList)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleUpdate = () => {
        //var obj = JSON.parse(JSON.stringify(inputList));
        //var values = Object.keys(obj).map(function (key) { return obj[key]; });

        let arr = Array(questionCount)
        for ( var i = 0; i < questionCount; i++ ) {
            if (inputList[`question${i}`]) {
                arr.push(inputList[`question${i}`])
            }
            else {
                arr.push(props.event.questions[i])
            }

        }

        console.log(arr)

        axios({
            method: 'put',
            url: `http://localhost:8080/events/${props.event.eventKey}`,
            headers: {"Authorization" : `Bearer ${props.user.accessToken}`},
            data: {
                "title": inputList["title"],
                "beginningTime": startingDate,
                "endingTime": endingDate,
                "eventKey": inputList["eventKey"],
                "quota": inputList["quota"],
                "questions": arr
            }
        }).then( res => {
            setOpen(false)
            props.setUpdate(props.update + 1) // trigger a render
        })
            .catch(err => {
                if ( err.response.data.errors ) {
                    setErrorMessage(err.response.data.errors[0].defaultMessage)
                    setErrorOpen(true)
                }
                else if (err.response.data.message) {
                    setErrorMessage(err.response.data.message)
                    setErrorOpen(true)
                }
                console.log(err.response)
            })
    };

    const incrementCount = () => {
        setQuestionCount(questionCount + 1)
    }

    const decrementCount = () => {
        if ( questionCount > 0 ) {
            setQuestionCount(questionCount - 1)
        }
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="inherit"
                onClick={handleClickOpen}
                startIcon={<EditIcon />}
                disabled={Date.now() > Date.parse(props.event.beginningTime)}>
                Düzenle
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Etkinlik Düzenleme</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aşağıdaki alanlar ile etkinliği düzenleyebilirsiniz.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        defaultValue={props.event.title}
                        margin="dense"
                        onChange={handleChange}
                        id="title"
                        name="title"
                        label="Etkinlik İsmi"
                        fullWidth
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDateTimePicker
                                margin="normal"
                                ampm={false}
                                disablepast
                                id="startingDate"
                                minDate={new Date()}
                                minDateMessage={"Başlangıç tarihi şimdiki zamandan önce olamaz!"}
                                value={startingDate} // ToDo manually change
                                onChange={handleStartingDateChange}
                                name="startingDate"
                                label="Başlangıç tarihi"
                                format="dd/MM/yyyy - HH:mm"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDateTimePicker
                                margin="normal"
                                id="startingDate"
                                ampm={false}
                                disablepast
                                minDate={startingDate}
                                minDateMessage={"Bitiş tarihi başlangıç tarihinden önce olamaz!"}
                                value={endingDate}
                                onChange={handleEndingDateChange}
                                name="endingDate"
                                label="Bitiş tarihi"
                                format="dd/MM/yyyy - HH:mm"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        onChange={handleChange}
                        defaultValue={props.event.eventKey}
                        id="eventKey"
                        name="eventKey"
                        label="Etkinlik Anahtarı (8 karakterden oluşmalı)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        onChange={handleChange}
                        id="quota"
                        defaultValue={props.event.quota}
                        name="quota"
                        label="Etkinlik Kotası"
                        fullWidth
                    />
                    <Button variant={"outlined"} onClick={incrementCount} color="primary">
                        Soru ekle
                    </Button>
                    <Button variant={"outlined"} onClick={decrementCount} color="secondary">
                        Soru kaldır
                    </Button>
                    {[...Array(questionCount)].map((e, i) => <TextField key={i}
                                                                        margin="dense"
                                                                        onChange={handleChange}
                                                                        id={`question${i}`}
                                                                        name={`question${i}`}
                                                                        defaultValue={props.event.questions[i]}
                                                                        label={`Soru ${i + 1}`}
                                                                        fullWidth
                    />)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        İptal Et
                    </Button>
                    <Button onClick={handleUpdate} color="primary" disabled={startingDate >= endingDate
                    || (inputList["eventKey"] && inputList["eventKey"].length !== 8) || !inputList["eventKey"]}>
                        Düzenle
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => setErrorOpen(false)}>
                <Alert severity="warning">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}