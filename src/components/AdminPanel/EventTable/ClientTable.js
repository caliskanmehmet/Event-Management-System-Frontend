import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import axios from "axios";
import Answers from "./Answers";

const columns = [
    { id: 'name', label: 'Ad', minWidth: 170 },
    { id: 'surname', label: 'Soyad', minWidth: 100 },
    { id: 'email', label: 'E-Mail Adresi', minWidth: 150 },
    { id: 'tcKimlikNo', label: 'TC Kimlik No', minWidth: 150 },
    { id: 'answers', label: 'Cevaplar', minWidth: 150 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    divider: {
        width: '100%',
        maxWidth: 200
    },
});

export default function ClientTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [clients, setClients] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        // Update the clients using the browser API
        axios.get( `http://localhost:8080/events/getClientsInfo/${props.eventKey}`,
            { headers: {"Authorization" : `Bearer ${props.user.accessToken}`} })
            .then(res => {
                setClients(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    },[props.count]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                if ( !(props.event.questions.length === 0 && column.id === "answers") ) {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )
                                }
                            }
                               )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={client["clientDTO"].tcKimlikNo}>
                                    {columns.map((column) => {
                                        if ( column.id !== "answers" ) {
                                            const value = client["clientDTO"][column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        }
                                        else if (props.event.questions.length !== 0) {
                                            const value = client["answerForm"];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Answers
                                                        answers={value}
                                                        questions={props.event.questions}
                                                        name={client["clientDTO"]["name"]}
                                                        surname={client["clientDTO"]["surname"]}
                                                    />
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}