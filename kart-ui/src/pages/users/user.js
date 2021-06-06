
import React, { useEffect, useState } from 'react'
import PageTitle from "../../components/PageTitle/PageTitle";

import { getUserInfo, updateUserInfo } from './services/user.service'
import useStyles from "./styles";

import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade,
    Collapse,
    IconButton
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';

import CloseIcon from "@material-ui/icons/Close";
import { useUserDispatch } from "../../context/UserContext";



export function UserPage(props) {
    var dispatch = useUserDispatch()
    var classes = useStyles();
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [firstName, setFirstName] = useState("");
    var [lastName, setLastName] = useState("");
    var [loginValue, setLoginValue] = useState("");
    var [phone, setPhoneValue] = useState("");
    const [open, setOpen] = useState(false);

    function updateUser() {
        let postData = {}
        if (phone) {
            postData = { firstName, lastName, phone }
        }
        else {
            postData = { firstName, lastName }

        }
        updateUserInfo(postData).then(re => {
            setOpen(true);
            localStorage.setItem('name', re.firstName + ' ' + re.lastName)
            dispatch({ type: 'LOGIN_SUCCESS', name: re.firstName + ' ' + re.lastName });
        })
    }


    useEffect(() => {
        getUserInfo().then(res => {
            setFirstName(res.firstName)
            setLastName(res.lastName)
            setLoginValue(res.email)
            setPhoneValue(res.phone)
        })
        return () => { }
    }, [])

    return (<><PageTitle title="Hello" button={<Button
        variant="contained"
        size="medium"
        color="secondary"
    >
        Latest Phones
        </Button>} />

        <Collapse in={open}>
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                Your Info has been updated sucessfully
        </Alert>
        </Collapse>
        <Grid container direction="column" justify="center">

            {error && <Typography color="secondary" className={classes.errorMessage}>
                Something is wrong with your login or password :(
          </Typography>}
            <TextField
                id="userfirstName"
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
                type="text"
            />
            <TextField
                id="userlastName"
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
                type="text"
            />
            <TextField
                id="userEmail"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                disabled

                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
            />
            <TextField
                id="userPhone"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                value={phone}
                onChange={e => setPhoneValue(e.target.value)}
                margin="normal"
                placeholder="Phone"
                type="number"
            />
            <div className={classes.formButtons}>
                {isLoading ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                        <Button
                            disabled={
                                loginValue.length === 0 ||
                                firstName.length === 0 || lastName.length === 0
                            }
                            onClick={() => updateUser()}
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Update
                        </Button>
                    )}
            </div>
        </Grid>

    </>)

}