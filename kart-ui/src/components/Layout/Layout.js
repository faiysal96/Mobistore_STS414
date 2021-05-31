import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
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
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/notifications" component={Notifications} />
            <Route path="/app/admin" component={Admin} />
            <Route path="/app/product/create" component={() => <ProductCreateAndEdit isEdit={false} />} />
            <Route path="/app/product/edit/:id" component={() => <ProductCreateAndEdit isEdit={true} />} />

            <Route path="/app/product/view/:id" component={ViewProduct} />
            <Route path="/app/user/edit" component={UserPage} />
            <Route path="/app/checkout" component={CheckoutPage} />
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
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>
              <Link
                color={'primary'}
                href={'https://google.com/'}
                target={'_blank'}
                className={classes.link}
              >
                Flatlogic
                </Link>
              <Link
                color={'primary'}
                href={'https://google.com/about'}
                target={'_blank'}
                className={classes.link}
              >
                About Us
                </Link>
              <Link
                color={'primary'}
                href={'https://google.com/blog'}
                target={'_blank'}
                className={classes.link}
              >
                Blog
                </Link>
            </div>
            <div>
              <Link
                href={'https://www.facebook.com/flatlogic'}
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
                href={'https://twitter.com/flatlogic'}
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
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);