/* eslint-disable no-unused-vars*/
import React, { Component } from "react";
import { AppBar, Card, CardContent, Typography,
   Grid, List, ListItem, ListItemText,
   Tabs, Tab, TabContainer, Button, MenuItem, Select } from "material-ui";
import ReservationModifyDialog from "./ReservationModifyDialog";
import { machines, machineTypes} from "../fakeData";
import floorMap from "../floor.png"

class MachineList extends Component {
  render = () => {
    return (
      <List>
        {this.props.machines.map(m => {
          return (
            <Button
              onClick={(e) => this.props.onMachineClick(e, m.id)}
              key={m.id}
              style={{padding: 3, textAlign: "left", textTransform: "None"}}>
              <Card>
                <CardContent>
                  <Grid container spacing={0} justify="center" alignItems="center">
                    <Grid item xs={4}>
                      <img alt="machine" src={machineTypes[m.type]} style={{width: "90%"}}/>
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
  }

  handleReservationModify = (e, id) => {
    this.setState({
      dialogOpen: true,
      selectedMachine: machines.filter(m => m.id === id)[0]
    });
  }

  handleDialogClose = () => {
    this.setState({dialogOpen: false});
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
        <Grid container style={{marginTop: 110}} spacing={0} justify="flex-end">
          <Grid item>
            <Select
              value="Most recent"
              displayEmpty
              name="sort"
            >
              {["Most recent", "Oldest"].map((sort, i) => {
                return (
                  <MenuItem key={i} value={sort}>{sort}</MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid xs={12} item>
            {this.state.currentTab === 0 &&
              <MachineList
                machines={JSON.parse(localStorage.getItem("reservations"))}
                onMachineClick={this.handleReservationModify}
              />}
            {this.state.currentTab === 1 &&
              <MachineList
                machines={machines}
                onMachineClick={() => {}}
              />}
          </Grid>
        </Grid>
        <ReservationModifyDialog
          open={this.state.dialogOpen}
          handleDialogClose={this.handleDialogClose}
          machine={this.state.selectedMachine}
        />
      </div>
    )
  }
}

export default MyReservations;
