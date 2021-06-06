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
// import classnames from "classnames";

import MuiAlert from '@material-ui/lab/Alert';



// styles
import useStyles from "./styles";

import LoginPage from './loginPage'

import RegPage from './regPage'

// logo
import logo from "./logo.svg";
// import google from "../../images/google.svg";

// context
// import { useUserDispatch, loginUser, registerUser } from "../../context/UserContext";
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login(props) {

  var classes = useStyles();
  const [isForgotPassword, setisForgotPassword] = useState(false)

  // global
  // var userDispatch = useUserDispatch();

  // local
  var [activeTabId, setActiveTabId] = useState(0);

  var [forgotEmail, setforgotEmail] = useState('');
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;




  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Mobi Store</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>

          {!isForgotPassword && <><Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered>
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>{activeTabId === 0 ? <LoginPage setPassword={setisForgotPassword} /> : <RegPage />}

          </>}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={() => setState({ ...state, open: false })}
            key={vertical + horizontal}
          ><Alert severity="success">
              Email has been sent, Please check
          </Alert>
          </Snackbar>

          {isForgotPassword && <Grid>

            <Typography variant="h4">Forgot Password</Typography>
            <br></br>
            <TextField type="email"
              variant="filled"
              autoFocus
              value={forgotEmail}
              label="Enter Your Email"
              onChange={(e) => setforgotEmail(e.target.value)}
              placeholder="Enter your Email"
              helperText="You will get an email with Password reset link"


            ></TextField>
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" onClick={() => { setisForgotPassword(false); setforgotEmail(""); setState({ ...state, open: true }) }} disabled={!forgotEmail}>Get Link</Button>
            <br></br>
            <br></br>

            <Button variant="text"
              size="large"
              className={classes.forgetButton}

              onClick={() => setisForgotPassword(false)}
              color="primary" >Back to Login</Button>

          </Grid>}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2021 <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://google.com" rel="noopener noreferrer" target="_blank">Mobi Store</a>, LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
