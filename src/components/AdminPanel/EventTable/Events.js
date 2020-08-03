import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import axios from "axios"
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteEventDialog from "./DeleteEventDialog";
import EnrolledClients from "./EnrolledClients";
import EditEventDialog from "./EditEventDialog";
import EnrollmentDateGraphContainer from "../EnrollmentDateGraph/EnrollmentDateGraphContainer";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

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
            <Title>Etkinlikler</Title>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Etkinlik İsmi</TableCell>
                        <TableCell align="center">Başlangıç Zamanı</TableCell>
                        <TableCell align="center">Bitiş Zamanı</TableCell>
                        <TableCell align="center">Etkinlik Anahtarı</TableCell>
                        <TableCell align="center">Kota</TableCell>
                        <TableCell align="center">Düzenleme</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event) => (
                        <StyledTableRow key={event.title}>
                            <TableCell component="th" scope="row">
                                {event.title}
                            </TableCell>
                            <TableCell align="center">{new Date(Date.parse(event.beginningTime)).toLocaleString()}</TableCell>
                            <TableCell align="center">{new Date(Date.parse(event.endingTime)).toLocaleString()}</TableCell>
                            <TableCell align="center">{event.eventKey}</TableCell>
                            <TableCell align="center">{event.quota}</TableCell>
                            <TableCell align="center">
                                <ButtonGroup aria-label="contained primary button group">
                                    <Button color="primary"
                                            component={() => <EnrolledClients
                                                update={props.count}
                                                setUpdate={props.setCount}
                                                user={props.user}
                                                eventKey={event.eventKey}
                                                event={event}/>}>
                                        Katılımcılar
                                    </Button>
                                    <Button color="primary"
                                            component={() => <EnrollmentDateGraphContainer
                                                user={props.user}
                                                eventKey={event.eventKey}
                                                event={event}/>}>
                                        Grafik
                                    </Button>
                                    <Button color="inherit"
                                            component={() => <EditEventDialog
                                                update={props.count}
                                                setUpdate={props.setCount}
                                                user={props.user}
                                                eventKey={event.eventKey}
                                                event={event}/>}>
                                        Düzenle
                                    </Button>
                                    <Button color="secondary"
                                            component={() => <DeleteEventDialog
                                                update={props.count}
                                                disabled={event.beginningTime >= new Date()}
                                                setUpdate={props.setCount}
                                                user={props.user}
                                                eventKey={event.eventKey}
                                                event={event}/>}>
                                        Sil
                                    </Button>
                                </ButtonGroup>
                            </TableCell>
                        </StyledTableRow >
                    ))}
                </TableBody>
            </Table>

        </React.Fragment>
    );
}