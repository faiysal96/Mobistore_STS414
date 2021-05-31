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

// styles
import useStyles from "./styles";

import LoginPage from './loginPage'

import RegPage from './regPage'

// logo
import logo from "./logo.svg";
// import google from "../../images/google.svg";

// context
// import { useUserDispatch, loginUser, registerUser } from "../../context/UserContext";


function Login(props) {

  var classes = useStyles();
  const [isForgotPassword, setisForgotPassword] = useState(false)

  // global
  // var userDispatch = useUserDispatch();

  // local
  var [activeTabId, setActiveTabId] = useState(0);



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

          {isForgotPassword && <Grid>
            <TextField type="email"></TextField>
          </Grid>}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2021-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://google.com" rel="noopener noreferrer" target="_blank">Mobi Store</a>, LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
