import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
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
import UnrollAlertDialog from "../../UserDashboard/UnrollAlertDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import EnrolledClients from "./EnrolledClients";
import EditEventDialog from "./EditEventDialog";

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

    console.log(Date.now())
    useEffect(() => {
        // Update the events using the browser API
        axios.get("http://localhost:8080/events", { headers: {"Authorization" : `Bearer ${props.user.accessToken}`} })
            .then(res => {
                console.log("Events:",res.data);
                setEvents(res.data)
            })
        },[props.count]);

    // ToDo make delete event button work, also re-render when add event happens

    return (
        <React.Fragment>
            <Title>Events</Title>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Event Title</TableCell>
                        <TableCell align="center">Beginning Time</TableCell>
                        <TableCell align="center">Ending Time</TableCell>
                        <TableCell align="center">Event Key</TableCell>
                        <TableCell align="center">Quota</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event) => (
                        <TableRow key={event.name}>
                            <TableCell component="th" scope="row">
                                {event.title}
                            </TableCell>
                            <TableCell align="center">{new Date(Date.parse(event.beginningTime)).toLocaleString()}</TableCell>
                            <TableCell align="center">{new Date(Date.parse(event.endingTime)).toLocaleString()}</TableCell>
                            <TableCell align="center">{event.eventKey}</TableCell>
                            <TableCell align="center">{event.quota}</TableCell>
                            <TableCell align="center">
                                <ButtonGroup aria-label="contained primary button group">
                                    <Button color="secondary"
                                        component={() => <DeleteEventDialog
                                            update={props.count}
                                            disabled={event.beginningTime >= new Date()}
                                            setUpdate={props.setCount}
                                            user={props.user}
                                            eventKey={event.eventKey}
                                            event={event}/>}>
                                        Delete
                                    </Button>
                                    <Button color="primary"
                                            component={() => <EnrolledClients
                                                update={props.count}
                                                setUpdate={props.setCount}
                                                user={props.user}
                                                eventKey={event.eventKey}
                                                event={event}/>}>
                                        Participants
                                    </Button>
                                    <Button color="inherit"
                                            component={() => <EditEventDialog
                                                update={props.count}
                                                setUpdate={props.setCount}
                                                user={props.user}
                                                eventKey={event.eventKey}
                                                event={event}/>}>
                                        Edit
                                    </Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}