import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from "axios"
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EnrollDialog from "./EnrollDialog";

function preventDefault(event) {
    event.preventDefault();
}

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
            <Title>Events</Title>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Event Title</TableCell>
                        <TableCell align="right">Beginning Time</TableCell>
                        <TableCell align="right">Ending Time</TableCell>
                        <TableCell align="right">Event Key</TableCell>
                        <TableCell align="right">Quota</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event) => {
                        if (Date.now() < Date.parse(event.beginningTime)) {
                            return(
                                <TableRow key={event.name}>
                                    <TableCell component="th" scope="row">
                                        {event.title}
                                    </TableCell>
                                    <TableCell align="right">{new Date(Date.parse(event.beginningTime)).toLocaleString()}</TableCell>
                                    <TableCell align="right">{new Date(Date.parse(event.endingTime)).toLocaleString()}</TableCell>
                                    <TableCell align="right">{event.eventKey}</TableCell>
                                    <TableCell align="right">{event.quota}</TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup color="primary" aria-label="contained primary button group">
                                            <Button
                                                component={() => (enrolledEvents.some(e => e.eventKey === event.eventKey)) ?
                                                    <Button disabled={true}>
                                                        Already enrolled
                                                    </Button>
                                                    :
                                                    event.quota === 0 ?
                                                        <Button disabled={true}>
                                                            No Quota Left
                                                        </Button>
                                                        :
                                                        <EnrollDialog
                                                            update={props.count}
                                                            setUpdate={props.setCount}
                                                            user={props.user}
                                                            eventKey={event.eventKey}
                                                            event={event}/>}>
                                                Enroll
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