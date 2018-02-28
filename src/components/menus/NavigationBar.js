import React, { Component } from "react";
import { withRouter } from "react-router";


import { AppBar, Drawer, Toolbar, Typography, IconButton, Button } from "material-ui";
import { withStyles } from "material-ui/styles";
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  hamburger: {
    marginRight: -12,
    marginLeft: 20,
  },
};

const titles = {
  "/": "Dashboard",
  "/reserve": "Reserve",
}

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {drawerOpen  : false};
  }

  toggleDrawer = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
    console.log(this.state);
  }

  render = () => {
    const classes = this.props.classes;
    return (
      <div>
        <Drawer
          anchor="right"
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer}
          onClick={this.toggleDrawer}>
          <div>
            <Typography color="inherit" variant="title" className={classes.flex}>
              {titles[this.props.location.pathname]}
            </Typography>

          </div>
        </Drawer>
        <AppBar className={classes.root}>
          <Toolbar>
            <Typography color="inherit" variant="title" className={classes.flex}>
              {titles[this.props.location.pathname]}
            </Typography>
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
