import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { Box, Divider, IconButton, Link, Typography as TEST } from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiYoutube as YoutubeIcon,
  mdiInstagram as InstagramIcon
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";
import Admin from "../Admin/adminPage";
import ProductCreateAndEdit from "../Product/product";
import ViewProduct from "../Product/viewproduct";
import { UserPage } from "../../pages/users/user";
import { CheckoutPage } from '../../pages/checkout/checkout'
import { OrderSuccessPage } from '../../pages/checkout/orderplaced'
import { SupportPage } from "../../pages/support/support";
import { VeiwSupportPage } from "../../pages/support/viewSupport";
import { AdminSupportPage } from "../../pages/support/adminViewSupport";
import { AdminOrders } from "../../pages/orders/AdminOrders";
import { ViewOrder } from "../../pages/orders/ViewOrder";



function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/my-orders" component={Tables} />
            <Route path="/app/admin" component={Admin} />
            <Route path="/app/product/create" component={() => <ProductCreateAndEdit isEdit={false} />} />
            <Route path="/app/product/edit/:id" component={() => <ProductCreateAndEdit isEdit={true} />} />

            <Route path="/app/product/view/:id" component={ViewProduct} />
            <Route path="/app/user/edit" component={UserPage} />
            <Route path="/app/checkout" component={CheckoutPage} />
            <Route path="/app/support" component={SupportPage} />
            <Route path="/app/support-view/:id" component={VeiwSupportPage} />
            <Route path="/app/support-admin" component={AdminSupportPage} />
            <Route path="/app/orders-admin" component={AdminOrders} />
            <Route path="/app/order-view/:id" component={ViewOrder} />



            


            <Route path="/app/order/sucess" component={OrderSuccessPage} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />

          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            className={classes.foot}
            style={{ marginTop: '120px'}}
            alignItems={"center"}
            justifyContent="space-around"
          >

            <div>
              <TEST variant="h5" >Company</TEST>
              <br></br>
            <Box mt={1}>
                <Link
                  color={'primary'}
                  href={'#'}
                  className={classes.link}
                >
                 Contact Us
                </Link>
              </Box>
              <Box mt={1}>
                <Link
                  color={'primary'}
                  href={'#'}
                  className={classes.link}
                >
                  About us
                </Link>
              </Box>
              <Box mt={1}>
                <Link
                  color={'primary'}
                  href={'#'}
                  className={classes.link}
                >
                  Careers
                </Link>
              </Box>
              <Box mt={1}>
                <Link
                color={'primary'}
                href={'#'}
                className={classes.link}
                >
                  Stories
                </Link>
              </Box>

            </div>

            <div>
            <TEST variant="h5" >Help & Support</TEST>
          <br></br>
            <Box mt={1}>
                <Link
                   color={'primary'}
                   to="/app/support"
                   className={classes.link}
                >
                  Support
                </Link>
              </Box>
              <Box mt={1}>
              <Link
                   color={'primary'}
                   to="/app/support"
                   className={classes.link}
                >
                  Payments
                </Link>
              </Box>
              <Box mt={1}>
              <Link
                   color={'primary'}
                   to="/app/support"
                   className={classes.link}
                >
                  Shipment
                </Link>
              </Box>
              <Box mt={1}>
              <Link
                   color={'primary'}
                   to="/app/support"
                   className={classes.link}
                >
                  Cancellations and Returns
                </Link>
              </Box>

            </div>
            <div>
            <TEST variant="h5" >Policy</TEST>
            <br></br>
            <Box mt={1}>
            <Link
                   color={'primary'}
                   to="/app/support"
                   className={classes.link}
                >
                  Return Policy
                </Link>
              </Box>
              <Box mt={1}>
              <Link
                   color={'primary'}
                   to="/app/support"
                   className={classes.link}
                >
                  Terms of Use
                </Link>
              </Box>
              <Box mt={1}>
              <Link
                   color={'primary'}
                   to="/app/support"
                   className={classes.link}
                >
                 Security
                </Link>
              </Box>
              <Box mt={1}>
              <Link
                   color={'primary'}
                   to="/app/support"
                   className={classes.link}
                >
                  Sitemap
                </Link>
              </Box>

            </div>
            <div>
              <Link
                href={'https://www.facebook.com'}
                target={'_blank'}
              >
                <IconButton aria-label="facebook">
                  <Icon
                    path={FacebookIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                href={'https://twitter.com'}
                target={'_blank'}
              >
                <IconButton aria-label="twitter">
                  <Icon
                    path={TwitterIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                href={'https://instagram.com'}
                target={'_blank'}
              >
                <IconButton aria-label="insta">
                  <Icon
                    path={InstagramIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                href={'https://instagram.com'}
                target={'_blank'}
              >
                <IconButton aria-label="insta">
                  <Icon
                    path={YoutubeIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              
              {/* <Link
                  href={'https://github.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link> */}
            </div>
          </Box>
          <Divider />
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            style={{marginTop: '0px !important'}}
            className={classes.foot1}
            alignItems={"center"}
            justifyContent="space-around"
          >
            © 2021 Mobi Store, all rights reserved. Made with love  for a better web.
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
