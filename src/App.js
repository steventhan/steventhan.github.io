import React, { Component } from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Reboot from "material-ui/Reboot";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";


import NavigationBar from "./components/menus/NavigationBar";
import Dashboard from "./components/Dashboard";
import Reserve from "./components/Reserve";
import './App.css';

const theme = createMuiTheme();

class App extends Component {
  render() {
    return (
      // <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Reboot />
            <NavigationBar />
            <Route exact path="/" component={Dashboard} page="Dashboard"/>} />
            <Route exact path="/reserve" render={props => <Reserve page="Reserve" />} />
          </div>
        </BrowserRouter>
      // </MuiThemeProvider>
    );
  }
}

export default App;
