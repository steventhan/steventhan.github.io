import React, { Component } from 'react';
import { Divider, InputAdornment, Input, InputLabel,
  Button, Typography, Grid, Radio, TextField, FormControlLabel } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

import { machineTypes, evalStatus } from "../fakeData"

class MachineSelectDialog extends Component {
  state = {
    open: false,
    start: "now",
    futureTime: "3:30pm"
  };

  handleStartChange = (e) => {
    console.log(this.state.start);
    this.setState({start: e.target.value});
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.open}
        onClose={this.props.handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="headline">
            Machine Information
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={4}>
              <img src={machineTypes[this.props.machine.type]} style={{width: "100%"}}/>
            </Grid>
            <Grid item xs={8}>
              <Typography component="p">
                <strong>ID: </strong>{`${this.props.machine.id}`}
              </Typography>
              <Typography component="p">
                <strong>Type: </strong>{`${this.props.machine.type}`}
              </Typography>
              <Typography component="p">
                <strong>Status: </strong>{`${evalStatus(this.props.machine)}`}
              </Typography>
              <Typography component="p">
                <strong>Queue size: </strong>{`${this.props.machine.queueSize}`}
              </Typography>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <Typography variant="title">Description</Typography>
                <Divider/>
                <Typography style={{paddingTop: 10, paddingBottom: 10}} component="p">
                  {`${this.props.machine.description}`}
                </Typography>
                <Divider/>
              </Grid>
            </Grid>

            <Grid style={{marginTop: 12}} container justify="center">
              <Grid item xs={10} alignContent="center">
                <FormControlLabel
                  control={
                    <Radio
                      checked={this.state.start === "now"}
                      onChange={this.handleStartChange}
                      value="now"
                    />
                  }
                  label="Now"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={this.state.start === "other"}
                      onChange={this.handleStartChange}
                      value="other"
                    />
                  }
                  label="Later at"
                />
                <TextField
                  onClick={() => this.setState({start: "other"})}
                  disabled={this.state.start === "other" ? false : true}
                  id="time" type="time" />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={10} alignContent="center">
                <InputLabel htmlFor="duration">Duration</InputLabel>
                <Input
                  value={20}
                  endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                />
              </Grid>
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDialogClose} variant="raised" color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => {
            let revs = JSON.parse(localStorage.getItem("reservations"));
            revs.push(this.props.machine);
            localStorage.setItem("reservations", JSON.stringify(revs));
            return this.props.handleDialogClose(e);
          }} variant="raised" color="primary" autoFocus>
            Reserve
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(MachineSelectDialog);
