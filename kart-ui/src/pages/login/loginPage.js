import React, { useState } from "react";
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

import { login } from './login.service'
import { useUserDispatch } from "../../context/UserContext";

// styles
import useStyles from "./styles";
  // var userDispatch = useUserDispatch();

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

function LoginPage(props) {
    var classes = useStyles();
    const dispatch = useUserDispatch()

    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [loginValue, setLoginValue] = useState("test@mail.com");
    var [passwordValue, setPasswordValue] = useState("test1123");

    function loginUser() {
        setIsLoading(true);
        login(loginValue, passwordValue).then(res => {
            if (res.data) {
                localStorage.setItem('id_token', res.data.accessToken);
                localStorage.setItem('isAdmin', JSON.stringify(res.data.role == 'ADMIN'));

                setError(null)
                setIsLoading(false)
                dispatch({ type: 'LOGIN_SUCCESS' , isAdmin : res.data.role == 'ADMIN' })
                props.history.push('/app/dashboard')
            }
        }).catch(err => {
            setError(true)
            setIsLoading(false)
            // userDispatch({ type: 'LOGIN_FAILURE' })
        })
    }

    return (<React.Fragment>
        <Typography variant="h1" className={classes.greeting}>
            Welcome!  Login
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
            <ul>
                <li>
                    Must be valid email
                </li>
                <li>
                    Password 8 character
                </li>
                
            </ul>

          </Typography>}
        <TextField
            id="email"
            InputProps={{
                classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                },
            }}
            value={loginValue}
            onChange={e => setLoginValue(e.target.value)}
            margin="normal"
            placeholder="Email Adress"
            type="email"
            fullWidth
        />
        <TextField
            id="password"
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
                        disabled={
                            loginValue.length === 0 || passwordValue.length === 0 
                        }
                        onClick={() =>
                            loginUser(

                            )
                        }
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Login
                    </Button>
                )}
            <Button
                color="primary"
                size="large"
                className={classes.forgetButton}
            >
                Forget Password
          </Button>
        </div>
    </React.Fragment>)
}

export default withRouter(LoginPage)