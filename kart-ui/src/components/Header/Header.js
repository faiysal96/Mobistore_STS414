import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Drawer,
  Link,
  Grid,
  Divider,
  Card
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingCartOutlined as Cart,
  Delete
} from "@material-ui/icons";
import classNames from "classnames";

import { useHistory } from 'react-router-dom';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
// styles
import useStyles from "./styles";

// components
import { Badge, Typography, Button } from "../Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";
import FavoriteIcon from '@material-ui/icons/Favorite';
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut, useUserState, removeItem } from "../../context/UserContext";

import { getCartItems, removeFromCart, setCartQuantity, updateCartQunatityApi } from '../Product/service/cart'

const messages = [];

const notifications = [
  { id: 0, color: "warning", message: "Check out this awesome ticket" },
  {
    id: 1,
    color: "success",
    type: "info",
    message: "What is the best way to get ...",
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "This is just a simple notification",
  },
  {
    id: 3,
    color: "primary",
    type: "e-commerce",
    message: "12 new orders has arrived today",
  },
];

export default function Header(props) {
  var classes = useStyles();
  var userState = useUserState();
const history = useHistory()


  const [drawer, setDrawer] = useState(userState.isDrawerOpen);

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();
  console.log(userState, "----");

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(true);
  var [cartItems, setCartItems] = useState([]);
  const [isLoading, setisLoading] = useState(false)

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
        removeItem(userDispatch)
      })
      setisLoading(false);

    })
  }

  function getCartItemsLocal() {
    getCartItems().then(re => {
      setCartItems(re)
    })
  }



  useEffect(() => {
    console.log("USE EFFECT");
    setDrawer(userState.isDrawerOpen)
    getCartItems().then(re => {
      setCartItems(re)
    })
    return () => {

    }
  }, [])

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Mobi Store
        </Typography>
        <div className={classes.grow} />
        {/* <Button component={Link} href="https://google.com/templates/react-material-admin-full" variant={"outlined"} color={"secondary"} className={classes.purchaseBtn}>Unlock full version</Button>
        <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div> */}
        {/* <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={() => { setDrawer(!drawer); getCartItemsLocal(); }}
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
          <FavoriteIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton> */}

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={() => { setDrawer(!drawer); getCartItemsLocal(); }}
          // onClick={e => {
          //   setMailMenu(e.currentTarget);
          //   setIsMailsUnread(false);
          // }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            color="secondary"
          >
            <Cart classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              Items in cart
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              {messages.length} items
            </Typography>
          </div>
          {messages.map(message => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {message.time}
                </Typography>
              </div>
              <div
                className={classNames(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide,
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography color="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            CheckOut
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {userState.name}
            </Typography>
            {/* <Typography
              className={classes.profileMenuLink}
              component="a"
              color="primary"
              href="https://google.com"
            >
              Flalogic.com
            </Typography> */}
          </div>
         
            <MenuItem
            onClick={()=> history.push('/app/user/edit')}
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem,
              )}
            >

              <AccountIcon className={classes.profileMenuIcon} />  <Link to={'/app/user/edit'}>Profile
                </Link>
          </MenuItem>

          {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem> */}
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Orders
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
        {/* <Button onClick={() => setDrawer(!drawer)}>anchor</Button> */}
        <Drawer anchor="right" open={drawer} onClose={() => setDrawer(!drawer)} >
          <div style={{ width: '500px', overflow: 'auto' }}>
            <Card style={{ padding: '20px 30px', position: "fixed", width: '100%' }}>
              <Typography variant="h6" weight="medium">Cart</Typography>
            </Card>

            <Grid wrap="nowrap" style={{ marginTop: '70px' }}><List component="nav" aria-label="main mailbox folders">
              {cartItems.map(cart => <><Link to={'/app/product/edit/' + cart.product.id}><ListItem button >
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
              </ListItem><Divider /></Link></>)}
            </List>
            </Grid>
            <Grid justify="center">
              <Card style={{ padding: '20px 30px', position: "fixed", width: '100%', bottom: '0' }}>
                <Divider />
                <Fab
                  variant="extended"
                  color="primary"
                  disabled={!cartItems.length}
                  aria-label="Add"
                  className={classes.sendMessageButton}
                >
                  CheckOut
            <SendIcon className={classes.sendButtonIcon} />
                </Fab>
              </Card>
            </Grid>

          </div>

        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
