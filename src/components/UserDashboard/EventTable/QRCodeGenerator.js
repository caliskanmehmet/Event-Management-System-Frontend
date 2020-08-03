import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import QRCode from "qrcode.react"
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

export default function QRCodeGenerator(props) {
    const [open, setOpen] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState({});

    useEffect(() => {
        // Get user details
        axios.get( `http://localhost:8080/clients/${props.user.username}`,
            { headers: {"Authorization" : `Bearer ${props.user.accessToken}`} })
            .then(res => {
                console.log(res.data)
                setUserDetails(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                QR Kod
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">QR Kod</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Etkinlik ve katılımcı detayları
                    </DialogContentText>
                    <QRCode value={` Event title:${props.event.title} 
                     Beginning time:${new Date(Date.parse(props.event.beginningTime)).toLocaleString()} 
                     Ending time:${new Date(Date.parse(props.event.endingTime)).toLocaleString()}
                     Participant full name:${userDetails.name} ${userDetails.surname} 
                     Participant mail:${userDetails.email} 
                    `}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Tamam
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}