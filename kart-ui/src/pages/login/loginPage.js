import React, { useEffect, useState } from "react";
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
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");

    function loginUser() {
        setIsLoading(true);
        login(loginValue, passwordValue).then(res => {
            if (res.data) {
                localStorage.setItem('id_token', res.data.accessToken);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('name', res.data.name);
                dispatch({ type: 'LOGIN_SUCCESS', role: res.data.role, name: res.data.name })
                props.history.push('/app/dashboard')
            }
            setError(null)
            setIsLoading(false)
        }).catch(err => {
            setError(true)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        document.title = "Login"
    })

    return (<React.Fragment>
        <Typography variant="h1" className={classes.greeting}>
            Welcome!  Login
        </Typography>
        {error && <Typography color="secondary" className={classes.errorMessage}>
            <ul>
                <li>
                    Inavlid Credentials
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
                id="loignBtn"

                        disabled={
                            loginValue.length === 0 || passwordValue.length === 0
                        }
                        onClick={() =>
                            loginUser()
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
                onClick={()=>props.setPassword(true)}
                className={classes.forgetButton}
            >
                Forget Password
          </Button>
        </div>
    </React.Fragment>)
}

export default withRouter(LoginPage)