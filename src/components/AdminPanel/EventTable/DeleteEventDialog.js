import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';

export default function DeleteEventDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUnroll = () => {
        axios({
            method: 'delete',
            url: `http://localhost:8080/events/delete/${props.event.eventKey}`,
            headers: {"Authorization" : `Bearer ${props.user.accessToken}`},
        }).then( res => {
            setOpen(false)
            props.setUpdate(props.update + 1) // trigger a render
        })
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
                startIcon={<DeleteIcon />}
                disabled={Date.now() > Date.parse(props.event.beginningTime)}
            >
                Sil
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Onayla"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bu etkinliği silmek istediğinizden emin misiniz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hayır
                    </Button>
                    <Button onClick={handleUnroll} color="secondary" autoFocus>
                        Evet
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}