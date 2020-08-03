import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import BarChartIcon from '@material-ui/icons/BarChart';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import EnrollmentDateGraphComponent from "./EnrollmentDateGraphComponent";

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

export default function EnrollmentDateGraphContainer(props) {
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
            <Button
                variant="outlined"
                color="primary"
                startIcon={<BarChartIcon/>}
                onClick={handleClickOpen}
                disabled={props.event.participantCount === 0}
            >
                Grafik
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Başvuru Gününe Göre Katılım Grafiği
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
                                <EnrollmentDateGraphComponent
                                    user={props.user}
                                    event={props.event}
                                />
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