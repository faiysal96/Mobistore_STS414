import React, { useState, useEffect } from "react";
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

import { register } from './login.service'

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

import { useUserDispatch } from "../../context/UserContext";


function RegPage(props) {
    var classes = useStyles();

    const dispatch = useUserDispatch();


    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [firstName, setFirstName] = useState("");
    var [lastName, setLastName] = useState("");
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");

    function regUser() {
        setIsLoading(true);
        register(firstName, lastName, loginValue, passwordValue).then(res => {
            if (res.data) {
                localStorage.setItem('id_token', res.data.accessToken);
                setError(null)
                setIsLoading(false)
                dispatch({ type: 'LOGIN_SUCCESS' })
                props.history.push('/app/dashboard')
            }
        }).catch(err => {
            setError(true)
            setIsLoading(false)
            // userDispatch({ type: 'LOGIN_FAILURE' })
        })
    }
    useEffect(()=>{
        document.title = "Register"
    })

    return (<React.Fragment>
        <Typography variant="h1" className={classes.greeting}>
            Welcome!  New User
        </Typography>
        {/* <Button size="large" className={classes.googleButton}>
          <img src={google} alt="google" className={classes.googleIcon} />
          &nbsp;Sign in with Google
        </Button>
        <div className={classes.formDividerContainer}>
          <div classNaMaterialme={classes.formDivider} />
          <Typography className={classes.formDividerWord}>or</Typography>
          <div className={classes.formDivider} />
        </div> */}
        {error && <Typography color="secondary" className={classes.errorMessage}>
            Something is wrong with your login or password :(
          </Typography>}
          <TextField
            id="firstName"
            autoFocus
            InputProps={{
                classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                },
            }}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            margin="normal"
            placeholder="First Name"
            type="email"
            fullWidth
        />
         <TextField
            id="lastName"
            InputProps={{
                classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                },
            }}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            margin="normal"
            placeholder="LastName"
            type="email"
            fullWidth
        />
        <TextField
            id="regemail"
            InputProps={{
                classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                },
            }}
            value={loginValue}
            onChange={e => setLoginValue(e.target.value)}
            margin="normal"
            name="email"
            placeholder="Email Adress"
            type="email"
            fullWidth
        />
        <TextField
            id="regpassword"
            InputProps={{
                classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                },
            }}
            value={passwordValue}
            onChange={e => setPasswordValue(e.target.value)}
            margin="normal"
            placeholder="Password"
            type="password"
            fullWidth
        />
        <div className={classes.formButtons}>
            {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
                    <Button
                    id="regbtn"
                        disabled={
                            loginValue.length === 0 || passwordValue.length === 0 ||
                            firstName.length === 0 || lastName.length === 0
                        }
                        onClick={() =>
                            regUser()
                        }
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Register
                    </Button>
                )}
        </div>
    </React.Fragment>)
}

export default withRouter(RegPage)