import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AuthService from "../services/AuthService";
import Redirect from "react-router-dom/Redirect";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function SignIn(props) {
    const classes = useStyles();
    const [inputList, setInputList] = React.useState({});
    const [open, setOpen] = React.useState(false)

    const handleChange = (event) => {
        const newInputList = {...inputList}
        newInputList[event.target.name] = event.target.value
        setInputList(newInputList)
    }

    const loginRequest = () => {
        AuthService.login(inputList["username"], inputList["password"]).then(
            () => {
                const userData = localStorage.getItem('user')
                const data = JSON.parse(userData)
                if ( data.roles.includes("ROLE_ADMIN")) {
                    props.setLoginStatus("admin")
                    console.log("Logged as admin")
                }
                else {
                    props.setLoginStatus("user")
                    console.log("Logged as user")
                }

            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setOpen(true)
                return resMessage
            }
        );
    }

    return (
        props.loginStatus === "admin" ? (<Redirect to='/panel'  />) :
        props.loginStatus === "user" ? (<Redirect to='/dashboard'  />) :
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Giriş yap
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        onChange={handleChange}
                        fullWidth
                        label="Kullanıcı Adı"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        onChange={handleChange}
                        fullWidth
                        name="password"
                        label="Şifre"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={loginRequest}
                        color="primary"
                        className={classes.submit}
                    >
                        Giriş yap
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Hesabınız yok mu? Kayıt olun"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity="warning">
                    Giriş başarısız!
                </Alert>
            </Snackbar>
        </Container>
    );
}