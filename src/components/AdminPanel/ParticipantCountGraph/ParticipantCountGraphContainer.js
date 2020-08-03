import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import BarChartIcon from '@material-ui/icons/BarChart';
import ParticipantCountGraphComponent from "./ParticipantCountGraphComponent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Events from "../EventTable/Events";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ParticipantCountGraphContainer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="inherit" startIcon={<BarChartIcon/>} onClick={handleClickOpen}>
                Katılımcı Sayısı Grafiği
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Katılımcı Sayısı Grafiği
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Kapat
                        </Button>
                    </Toolbar>
                </AppBar>
                <br/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6} lg={2}>

                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                            <Paper className={classes.paper}>
                                <ParticipantCountGraphComponent user={props.user}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>

                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}