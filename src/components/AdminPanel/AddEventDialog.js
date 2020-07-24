import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

export default function AddEventDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [inputList, setInputList] = React.useState({});
    const [startingDate, handleStartingDateChange] = React.useState(new Date());
    const [endingDate, handleEndingDateChange] = React.useState(new Date());

    const handleChange = (event) => {
        const newInputList = {...inputList}
        newInputList[event.target.name] = event.target.value
        console.log(newInputList)
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

    const questionFields = []

    const returnQuestionTextField = () => {
        questionFields.push(<TextField
            margin="dense"
            onChange={handleChange}
            id="question"
            name="question"
            label="Soru"
            fullWidth
        />)
        console.log("pushed field")
        console.log(questionFields)
        setOpen(true)
    }


    // ToDo add question component for each button click

    return (
        <div>
            <Button variant="outlined" color="inherit" onClick={handleClickOpen} startIcon={<AddIcon />}>
                Add Event
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Etkinlik Oluşturma</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Etkinliği oluşturabilmeniz için aşağıdaki alanları doldurmanız
                        gerekiyor.
                    </DialogContentText>
                    <TextField
                        autoFocus
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
                                disablepast={true}
                                id="startingDate"
                                minDate={new Date()}
                                minDateMessage={"Başlangıç tarihi şimdiki zamandan önce olamaz!"}
                                value={startingDate}
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
                                disablepast={true}
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
                        id="eventKey"
                        name="eventKey"
                        label="Etkinlik Anahtarı (8 karakterden oluşmalı)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        onChange={handleChange}
                        id="quota"
                        name="quota"
                        label="Etkinlik Kotası"
                        fullWidth
                    />
                    <Button variant={"outlined"} onClick={returnQuestionTextField} color="primary">
                        Soru ekle
                    </Button>
                    {questionFields.map( textField => textField ) }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        İptal Et
                    </Button>
                    <Button onClick={handleEnroll} color="primary" disabled={startingDate >= endingDate}>
                        Oluştur
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}