import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  ErrorOutline,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

import {
  useUserState
} from "../../context/UserContext";

const structure = [
  { id: 1, label: "Home", link: "/app/dashboard", icon: <HomeIcon />, role: 'USER' },

  { id: 2, label: "My Orders", link: "/app/my-orders", icon: <TableIcon />, role: 'USER' },

  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "SELLER", role: ['ADMIN'] },
  { id: 7, label: "Mange Products", link: "/app/admin", icon: <LibraryIcon />, role: 'ADMIN' },
  { id: 8, label: "Mange Orders", link: "/app/orders-admin", icon: <TableIcon />, role: 'ADMIN' },
  { id: 9, label: "Mange Issues", link: "/app/support-admin", icon: <ErrorOutline />, role: 'ADMIN' },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "HELP", role: 'USER' },
  { id: 12, label: "Support", link: "/app/support", icon: <SupportIcon />, role: 'USER' },
  { id: 13, label: "FAQ", link: "https://google.com/forum", icon: <FAQIcon />, role: 'USER' },
  { id: 14, type: "divider" },

];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  var { role } = useUserState();


  // local
  var [isPermanent, setPermanent] = useState(false);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          (role === link.role || role === 'ADMIN') && <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />

        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
