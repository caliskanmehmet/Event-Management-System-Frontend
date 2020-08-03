import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import axios from "axios"
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EnrollDialog from "./EnrollDialog";

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 650,
    },
}));

export default function Events(props) {
    const classes = useStyles();
    const [events, setEvents] = React.useState([])
    const [enrolledEvents, setEnrolledEvents] = React.useState([])

    useEffect(() => {
        // Update the events using the browser API
        axios.get("http://localhost:8080/events", { headers: {"Authorization" : `Bearer ${props.user.accessToken}`} })
            .then(res => {
                console.log("Events:",res.data);
                setEvents(res.data)
            })
        axios.get( `http://localhost:8080/clients/${props.user.username}/events`,
            { headers: {"Authorization" : `Bearer ${props.user.accessToken}`} })
            .then(res => {
                console.log("Enrolled events:", res.data)
                setEnrolledEvents(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[props.count]);

    return (
        <React.Fragment>
            <Title>Etkinlikler</Title>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Etkinlik İsmi</TableCell>
                        <TableCell align="right">Başlangıç Zamanı</TableCell>
                        <TableCell align="right">Bitiş Zamanı</TableCell>
                        <TableCell align="right">Etkinlik Anahtarı</TableCell>
                        <TableCell align="right">Kota</TableCell>
                        <TableCell align="center">Düzenle</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event) => {
                        if (Date.now() < Date.parse(event.beginningTime)) {
                            return(
                                <TableRow key={event.title}>
                                    <TableCell component="th" scope="row">
                                        {event.title}
                                    </TableCell>
                                    <TableCell align="right">{new Date(Date.parse(event.beginningTime)).toLocaleString()}</TableCell>
                                    <TableCell align="right">{new Date(Date.parse(event.endingTime)).toLocaleString()}</TableCell>
                                    <TableCell align="right">{event.eventKey}</TableCell>
                                    <TableCell align="right">{event.quota}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup color="primary" aria-label="contained primary button group">
                                            <Button
                                                component={() => (enrolledEvents.some(e => e.eventKey === event.eventKey)) ?
                                                    <Button disabled={true}>
                                                        Zaten kayıtlı
                                                    </Button>
                                                    :
                                                    event.quota === 0 ?
                                                        <Button disabled={true}>
                                                            Etkinlik dolu
                                                        </Button>
                                                        :
                                                        <EnrollDialog
                                                            update={props.count}
                                                            setUpdate={props.setCount}
                                                            user={props.user}
                                                            eventKey={event.eventKey}
                                                            event={event}/>}>
                                                Kayıt ol
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}