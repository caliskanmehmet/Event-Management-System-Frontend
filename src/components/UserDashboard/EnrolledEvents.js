import React, {useEffect} from 'react';
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
import UnrollAlertDialog from "./UnrollAlertDialog";

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

export default function EnrolledEvents(props) {
    const classes = useStyles();
    const [events, setEvents] = React.useState([])

    useEffect(() => {
        // Update the events using the browser API, get all events
        axios.get( `http://localhost:8080/clients/${props.user.username}/events`,
            { headers: {"Authorization" : `Bearer ${props.user.accessToken}`} })
            .then(res => {
                console.log(res.data)
                setEvents(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[props.count]);


    return (
        <React.Fragment>
            <Title>Enrolled Events</Title>
            <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Event Title</TableCell>
                        <TableCell align="right">Beginning Time</TableCell>
                        <TableCell align="right">Ending Time</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event) => (
                        <TableRow key={event.name}>
                            <TableCell component="th" scope="row">
                                {event.title}
                            </TableCell>
                            <TableCell align="right">{event.beginningTime}</TableCell>
                            <TableCell align="right">{event.endingTime}</TableCell>
                            <TableCell align="right">
                                <ButtonGroup color="secondary" aria-label="contained primary button group">
                                    <Button
                                        component={() => <UnrollAlertDialog
                                            update={props.count}
                                            setUpdate={props.setCount}
                                            user={props.user}
                                            eventKey={event.eventKey}
                                            event={event}/>}>
                                        Unroll
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