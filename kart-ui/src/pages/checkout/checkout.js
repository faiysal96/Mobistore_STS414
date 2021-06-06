
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
    MenuItem,
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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ListItemIcon from '@material-ui/core/ListItemIcon';


import Alert from '@material-ui/lab/Alert';

import Delete from '@material-ui/icons/Delete'
import { useHistory } from 'react-router-dom';



import CloseIcon from "@material-ui/icons/Close";

import { getCartItems, removeFromCart, setCartQuantity, updateCartQunatityApi, clearCart } from '../../components/Product/service/cart';

import { placeOrder } from "./services/order.service";



export function CheckoutPage(props) {
    var classes = useStyles();
    var [isLoading, setisLoading] = useState(false);
    var [error, setError] = useState(null);
    var [order_to_name, setOrderToName] = useState("");
    var [address, setAddress] = useState("");
    var [status, setStatus] = useState("Pending");
    var [notes, setNotes] = useState("");
    var [phone, setPhoneValue] = useState("");
    const [open, setOpen] = useState(false);
    var [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setpaymentMethod] = useState('CARD')
    const [cardInfo, setcardInfo] = useState(9142998912349789)
    const [cvv, setCvv] = useState('000')
    const [otp, setOtp] = useState('')

    const history = useHistory()



    const [dialogOpen, setdialogOpen] = useState(false)

    function updateQuantity(cartId, quantity) {
        if (quantity > -1) {
            setisLoading(true)
            updateCartQunatityApi(cartId, { quantity }).then(res => {
                getCartItems().then(re => {
                    setCartItems(re)
                });
                setisLoading(false);

            }).catch(err => {
                setisLoading(false)

            })
        }
    }

    function removeFromCartItem(product) {
        // setisLoading(true);
        removeFromCart(product).then(res => {
            getCartItems().then(res => {
                setCartItems(res);
                // removeItem(userDispatch)
            })
            setisLoading(false);

        })
    }

    function getTotal(cartItems) {
        return cartItems.map(cart => cart.product.prize * cart.quantity).reduce((a, b) => a + b, 0);

    }

    function getCartItemsLocal() {
        getCartItems().then(re => {
            setCartItems(re)
        })
    }

    function onPlaceOrder() {
        if(otp == '12345') {
            let orderItems = cartItems.map(item => {
                return {
                    quantity: item.quantity,
                    product: item.product.id
                }
            })
    
            let prize = getTotal(cartItems)
            placeOrder({ order_to_name, address, status, notes, phone: parseInt(phone), orderItems, prize, paymentMethod }).then(res => {
                clearCart().then(re => {
                    history.push('/app/order/sucess')
                })
    
                console.log(res);
            })
        } else {
            setOpen(true)
        }
       
    }

    useEffect(() => {
        console.log("USE EFFECT");
        // setDrawer(userState.isDrawerOpen)
        getCartItemsLocal()
        return () => {

        }
    }, [])

    return (<><PageTitle title="Checkout" />
        <Grid container justify="center">
            <div style={{ width: '90%' }}>
                <Card style={{ padding: '20px 30px', width: '100%' }}>
                    <Typography variant="h5" weight="medium">Your Cart Deatils</Typography>
                    <Grid wrap="nowrap" style={{ marginTop: '40px' }}><List component="nav" aria-label="main mailbox folders" id="cartContent">
                        {cartItems.map(cart => <><Link to={'/app/product/view/' + cart.product.id}><ListItem button >
                            <ListItemIcon>
                                <AvatarGroup max={2}>
                                    {cart.product.images.map(image => <Avatar alt="Remy Sharp" src={'http://localhost:5000/' + image.path} />)}
                                </AvatarGroup>
                            </ListItemIcon>
                            <ListItemText style={{ margin: '0 20px' }} primary={cart.product.name} secondary={
                                <React.Fragment>
                                    <Button size="medium" color="secondary" disabled={cart.quantity === 0}
                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); updateQuantity(cart.id, cart.quantity - 1) }}>
                                        -
                                    </Button>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {cart.quantity}
                                    </Typography>
                                    <Button size="medium" color="primary"
                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); updateQuantity(cart.id, cart.quantity + 1) }}>+</Button>

                                    <Button size="medium" color="secondary"
                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); removeFromCartItem(cart.product.id); }}>
                                        <Delete />
                                    </Button>
                                </React.Fragment>
                            } />
                            {/* <ListItemText style={{ margin: '0 20px' }} primary={cart.product.name} secondary={'$ ' + (cart.product.prize * cart.quantity) + '/-   Quantity: ' + String(cart.quantity)} /> */}
                        </ListItem>
                            <Divider />
                        </Link></>)}
                    </List>
                        <br></br>
                        <Grid container justify="flex-end" alignItems="flex-end">
                            <Typography variant="h5"> Total Cart Value: $<strong>{getTotal(cartItems)}
                                </strong> </Typography>
                        </Grid>
                    </Grid>
                    <br></br>

                    <Grid container direction="column" justify="center">
                        {error && <Typography color="secondary" className={classes.errorMessage}>
                            Something Worng with your products :(
                                </Typography>}
                                <br></br>
                        <Typography variant="subtitle1">Order Details</Typography>
                        <br></br>
                        <TextField id="checkoutname"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                },
                            }}
                            value={order_to_name}
                            label="Order Name"
                            onChange={e => setOrderToName(e.target.value)}
                            helperText="*Please enter the name of the person"
                            margin="normal"
                            placeholder="Name"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            id="checkoutAdress"
                            rows={3}
                            multiline
                            label="Address"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                },
                            }}
                            helperText="Enter the address of order."
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            margin="normal"
                            placeholder="Order Address"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            id="userPhone"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                },
                            }}
                            label="Phone Number"
                            value={phone}
                            onChange={e => setPhoneValue(e.target.value)}
                            helperText="Please enter phone number for the executive to contact"
                            margin="normal"
                            placeholder="Phone"
                            type="number"
                            variant="outlined"
                        />
                        <TextField
                            id="notes"
                            label="Notes"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                },
                            }}
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            margin="normal"
                            helperText="Please enter notes for us to take any actions"

                            placeholder="Add Notes"
                            type="text"
                            variant="outlined"
                        />
                        <br></br>
                        <Divider />
                        <br></br>
                        <Typography variant="h5">Payment Details</Typography>
                        <br></br>
                        <TextField
                            id="paymentMethod"
                            select
                            label="Payment Type"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                },
                            }}
                            value={paymentMethod}
                            onChange={e => setpaymentMethod(e.target.value)}
                            margin="dense"
                            helperText="Currently we are only accepting Cards"
                            placeholder="Name"
                            type="text"
                            variant="outlined"
                        >
                            <MenuItem key={'CARD'} value={'CARD'}>
                                Card
                                </MenuItem>
                        </TextField>
                        <TextField
                            id="cardInfo"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                },
                            }}
                            label="Card Number"
                            value={cardInfo}
                            onChange={e => setcardInfo(e.target.value)}
                            margin="dense"
                            helperText="Must be a valid card"
                            placeholder="Name"
                            type="number"
                            variant="outlined"
                        >
                        </TextField>
                        <TextField
                            id="cvv"
                            label="CVV"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                },
                            }}
                            value={cvv}
                            helperText="Please enter CVV present at back of card"
                            onChange={e => setCvv(e.target.value)}
                            margin="dense"
                            max={3}
                            placeholder="CVV"
                            type="password"
                            variant="outlined"
                        >
                        </TextField>
                        <TextField
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            id="otp"
                            value={'20/22'}
                            variant="outlined"
                            label="Expiry Date"
                            type="text"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                },
                            }}
                            fullWidth
                        />
                        <div className={classes.formButtons}>
                            {isLoading ? (
                                <CircularProgress size={26} className={classes.loginLoader} />
                            ) : (
                                    <Button
                                        id="placeOrderBtn"
                                        disabled={
                                            phone.length === 0 ||
                                            order_to_name.length === 0 || address.length === 0 || String(cardInfo).length !=16
                                        }
                                        // onClick={() => onPlaceOrder()}
                                        onClick={() => setdialogOpen(true)}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        Place Order
                                    </Button>
                                )}

                            <Dialog open={dialogOpen} onClose={() => { }} aria-labelledby="form-dialog-title" >
                                <DialogTitle id="form-dialog-title">Enter OTP</DialogTitle>
                                <DialogContent style={{ width: '600px' }}>
                                    <DialogContentText>
                                        Do Not share your OTP with any others
                                        <Collapse in={open}>
                                            <Alert color="error" action={<IconButton
                                                aria-label="close"
                                                color="secondary"
                                                size="small"
                                                onClick={() => { setOpen(false) }}>
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>}>
                                               Invalid Card / Invalid Otp
                        </Alert>
                                        </Collapse>
                                        {open && <Button onClick={()=>setOtp('')}>Resend Otp</Button>}
                                    </DialogContentText>
                                    <TextField

                                        margin="dense"
                                        id="otpInput"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        variant="outlined"
                                        label="Enter OTP"
                                        helperText="Please check your mobile phone and enter OTP - Ex:12345"
                                        type="password"
                                        InputProps={{
                                            classes: {
                                                underline: classes.textFieldUnderline,
                                                input: classes.textField,
                                            },
                                        }}
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setdialogOpen(false)} color="primary">
                                        Cancel
                                    </Button>
                                    <Button id="confirmOtp" onClick={() => onPlaceOrder()} disabled={!otp || !(otp.length >= 4)} color="primary" variant="contained">
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Grid>
                </Card>
            </div>
        </Grid>
    </>)
}