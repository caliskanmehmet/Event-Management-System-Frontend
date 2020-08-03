import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

export default function UnrollAlertDialog(props) {
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
            url: `http://localhost:8080/unroll/${props.user.username}/${props.event.eventKey}`,
            headers: {"Authorization" : `Bearer ${props.user.accessToken}`},
        }).then( res => {
            setOpen(false)
            props.setUpdate(props.update + 1) // trigger a render
        })
    }

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                Kaydı Sil
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
                        Bu etkinlikten çıkmak istediğinize emin misiniz?
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