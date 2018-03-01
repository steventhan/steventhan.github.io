import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import {
  AppBar,
  Avatar,
  Drawer,
  Toolbar,
  Grid,
  Typography,
  IconButton,
  Badge,
  Divider,
  Popover,
 } from "material-ui";
import {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import { withStyles } from "material-ui/styles";
import MenuIcon from 'material-ui-icons/Menu';
import { Dashboard, Assignment, Settings, Person, Notifications } from 'material-ui-icons';
import treadmill from "../../treadmill.svg";
import heisenberg from "../../heisenberg.jpg";
import qrcode from "../../qrcode.png";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  hamburger: {
    marginRight: -12,
  },
  typography: {
    margin: 10,
  }
};

const titles = {
  "/": "Dashboard",
  "/reserve": "Reserve",
  "/my-reservations": "My reservations",
  "/settings" : "Settings",
  "/membership" : "Membership",
}

const links = [
  {path: "/", name: "Dashboard", icon: <Dashboard />},
  {path: "/reserve", name: "Reserve", icon: <img alt="ss" src={treadmill} />},
  {path: "/my-reservations", name: "My reservations", icon: <Assignment />},
  {path: "/settings", name: "Settings", icon: <Settings />},
  {path: "/membership", name: "Membership", icon: <Person />},
]

class UserProfile extends Component {
  render = () => {
    return (
      <Grid container justify="center" spacing={0} style={{marginTop: "10%", marginBottom: "5%"}}>
        <Grid item>
          <Avatar alt="heisenberg" style={{width: 100, height: 100}} src={heisenberg} />
          <Typography style={{paddingLeft: 10, paddingTop: 10}} variant="body1">Walter White</Typography>
        </Grid>
      </Grid>
    );
  }

}


class QRCode extends Component {
  render = () => {
    return (
      <Grid container justify="center" spacing={0} style={{marginTop: "20%"}}>
        <Grid item>
          <img alt="qr" style={{width: 100, height: 100}} src={qrcode} />
          <Typography style={{paddingLeft: 5}} variant="body1">Your QR code</Typography>
        </Grid>
      </Grid>
    );
  }

}

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen  : false,
      popoverOpen  : false,
      anchorEl: null,
    };
  }

  toggleDrawer = (e) => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleNotification = (e) => {
    this.setState({
      popoverOpen: true,
      anchorEl: findDOMNode(this),
    });
  }

  handlePopoverClose = (e) => {
    this.setState({
      popoverOpen: false,
    });
  }

  render = () => {
    const classes = this.props.classes;
    return (
      <div>
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          anchorReference="anchorEl"
          onClose={this.handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography className={classes.typography}>The content of the Popover.</Typography>
        </Popover>
        <Drawer
          anchor="right"
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer}
          onClick={this.toggleDrawer}>
          <UserProfile />
          <Divider />
          {links.map((l, i) => {
            return (
              <ListItem component={Link} to={l.path} key={i} button>
                <ListItemIcon>
                  {l.icon}
                </ListItemIcon>
                <ListItemText primary={l.name} />
              </ListItem>
            )
          })}
          <Divider />
          <QRCode />
        </Drawer>
        <AppBar className={classes.root}>
          <Toolbar>
            <Typography color="inherit" variant="title" className={classes.flex}>
              <strong>{titles[this.props.location.pathname]}</strong>
            </Typography>
            <IconButton onClick={this.handleNotification} color="inherit">
              <Badge badgeContent={2} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton onClick={this.toggleDrawer} className={classes.hamburger} color="inherit">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(NavigationBar));
