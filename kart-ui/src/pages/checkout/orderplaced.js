


import React, { useEffect, useState } from 'react'
import PageTitle from "../../components/PageTitle/PageTitle";

// import { getUserInfo, updateUserInfo } from './services/user.service'
import useStyles from "./styles";
import { Link } from 'react-router-dom';


import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Card,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Fab,
    Tab,
    TextField,
    Fade,
    Collapse,
    IconButton
} from "@material-ui/core";

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ListItemIcon from '@material-ui/core/ListItemIcon';


import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import Alert from '@material-ui/lab/Alert';

import Delete from '@material-ui/icons/Delete'



import CloseIcon from "@material-ui/icons/Close";

import { getCartItems, removeFromCart, setCartQuantity, updateCartQunatityApi } from '../../components/Product/service/cart'



export function OrderSuccessPage(props) {

    useEffect(() => {
        document.title = "Order Sucess"
        return () => {
            
        }
    }, [])


    return (<>
        <Grid container justify="center" alignItems="center" direction="column">

            <CheckCircleOutlineIcon style={{ color: 'green', fontSize: '200' }} />
            <Typography variant="h2">THANK YOU!! You order has been placed</Typography>
            <br></br>
            <Link to={'/app/dashboard'}><Typography variant="h4">
                <u>
                    Go to Products
                    </u>
            </Typography></Link>
        </Grid>

    </>)
}