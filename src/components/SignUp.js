import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";

import AuthService from "../services/AuthService";
import Redirect from "react-router-dom/Redirect";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function SignUp() {
    const classes = useStyles();
    const [inputList, setInputList] = React.useState({});
    const [redirect, setRedirect] = React.useState(false);

    const handleChange = (event) => {
        const newInputList = {...inputList}
        newInputList[event.target.name] = event.target.value
        setInputList(newInputList)
    }

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/target' />
        }
    }

    const signUpRequest = () => {
        AuthService.register(
            inputList["username"],
            inputList["email"],
            inputList["password"],
            ["user"],
            inputList["name"],
            inputList["surname"],
            inputList["tcKimlikNo"]
        ).then(
            response => {
                if (response.status === 200) { // ToDo redirect!!
                    console.log("Status is 200")
                    setRedirect(true)
                }
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

            })
    }

    return (
        redirect ? (<Redirect to='/'  />) :
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Kayıt Ol
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                label="İsim"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                onChange={handleChange}
                                required
                                fullWidth
                                label="Soyisim"
                                name="surname"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                onChange={handleChange}
                                required
                                fullWidth
                                label="E-mail Adresi"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                onChange={handleChange}
                                required
                                fullWidth
                                label="TC Kimlik No"
                                name="tcKimlikNo"
                                autoComplete="tcKimlikNo"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                onChange={handleChange}
                                required
                                fullWidth
                                label="Kullanıcı Adı"
                                name="username"
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                onChange={handleChange}
                                required
                                fullWidth
                                name="password"
                                label="Şifre"
                                type="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        onClick={signUpRequest}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Kayıt Ol
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Zaten bir hesabınız var mı? Giriş yapın
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}