import React, { Component } from "react";
import { AppBar, Card, CardContent, Typography,
   Grid, Paper, List, ListItem, ListItemText,
   Tabs, Tab, TabContainer, Button, MenuItem, Select } from "material-ui";
import { withStyles } from "material-ui/styles";
import { FileUpload } from "material-ui-icons";
import MachineSelectDialog from "./MachineSelectDialog";
import { machines, machineTypes, evalStatus } from "../fakeData";
import floorMap from "../floor.png"

class MachineList extends Component {
  render = () => {
    return (
      <List>
        {this.props.machines.map(m => {
          return (
            <Button
              onClick={(e) => this.handleReservationModify(e, m.id)}
              key={m.id}
              style={{padding: 3, textAlign: "left", textTransform: "None"}}>
              <Card>
                <CardContent>
                  <Grid container spacing={0}>
                    <Grid item xs={4}>
                      <img src={machineTypes[m.type]} style={{width: "90%"}}/>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography component="p">
                        <strong>ID: </strong>{`${m.id}`}
                      </Typography>
                      <Typography component="p">
                        <strong>Type: </strong>{`${m.type}`}
                      </Typography>
                      <Typography component="p">
                        <strong>Start: </strong>1:30pm
                      </Typography>
                      <Typography component="p">
                        <strong>End: </strong>1:50pm
                      </Typography>
                      <Typography component="p">
                        <strong>Duration: </strong>20 minutes
                      </Typography>
                      <Typography component="p">
                        <strong>Description: </strong>{`${m.description}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Button>
          );
        })}
      </List>
    );
  }
}


class MyReservations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0,
      machineTypes: [],
      dialogOpen: false,
      selectedMachine: machines[0]
    };
    Object.keys(machineTypes).forEach((m, i) => {
      this.state.machineTypes[i] = {m: false};
    });
    this.state.machineTypes[machineTypes.length-1] = true;
  }

  handleReservationModify(e, id) {
    this.setState({
      dialogOpen: true,
      selectedMachine: machines.filter(m => m.id === id)[0]
    });
  }

  handleTabChange = (e, val) => {
    this.setState({ currentTab: val });
  };

  render() {
    return (
      <div>
        <AppBar style={{marginTop: 55}} position="fixed" color="default">
          <Tabs
            value={this.state.currentTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            fullWidth
          >
            <Tab label="Upcoming" />
            <Tab label="History" />
          </Tabs>
        </AppBar>
        <Grid container style={{marginTop: 110}} spacing={0}>
          <Grid xs={8} item></Grid>
          <Grid xs={4} item>
            <Select
              value="Most recent"
              displayEmpty
              name="sort"
            >
              {["Most recent", "Oldest"].map(sort => {
                return (
                  <MenuItem value={sort}>{sort}</MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid xs={12} item>
            {this.state.currentTab === 0 && <MachineList machines={JSON.parse(localStorage.getItem("reservations"))}/>}
            {this.state.currentTab === 1 &&
              <div style={{paddingTop: 3}}>
                <img onClick={() => this.setState({dialogOpen: true})} src={floorMap} width="100%"/>
              </div>}
          </Grid>
        </Grid>
        <MachineSelectDialog
          open={this.state.dialogOpen}
          handleDialogClose={this.handleDialogClose}
          machine={this.state.selectedMachine}
        />
      </div>
    )
  }
}

export default MyReservations;
