import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClientTable from "./ClientTable";
import PeopleIcon from '@material-ui/icons/People';

export default function EnrolledClients(props) {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                startIcon={<PeopleIcon />}
                disabled={props.event.participantCount === 0}
            >
                Katılımcılar
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">{`Katılımcılar - ${props.event.title}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Burada etkinliğe katılan katılımcıların bilgilerini görebilirsiniz.
                    </DialogContentText>
                    <ClientTable user={props.user} eventKey={props.event.eventKey} event={props.event}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}