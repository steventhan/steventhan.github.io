import React, { Component } from 'react';
import { Divider, InputAdornment, Input, InputLabel,
  Button, Typography, Grid, Radio, TextField, FormControlLabel } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

import { Up } from "./UtilComponents";
import { machineTypes, evalStatus } from "../fakeData"

class ReservationModifyDialog extends Component {
  state = {
    open: false,
    start: "now",
    futureTime: "3:30pm"
  };

  handleStartChange = (e) => {
    this.setState({start: e.target.value});
  }

  handleSave = (e) => {
    this.props.sendSnackbarMsg("Saved");
    this.props.handleDialogClose(e);
  }

  handleCancel = (e) => {
    this.props.sendSnackbarMsg("Cancelled");
    let revs = JSON.parse(localStorage.getItem("reservations"));
    localStorage.setItem("reservations", JSON.stringify(revs.filter(r => r.id !== this.props.machine.id)));
    this.props.handleDialogClose(e);
  }


  render() {
    const { fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.open}
        onClose={this.props.handleDialogClose}
        aria-labelledby="responsive-dialog-title"
        transition={Up}
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>Reservation detail</strong>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <Grid item xs={4}>
              <img alt="ss" src={machineTypes[this.props.machine.type]} style={{width: "100%"}}/>
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
              <Button onClick={this.handleCancel} size="small" fullWidth variant="raised" color="secondary">
                Cancel reservation
              </Button>
            </Grid>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="subheading"><strong>Description</strong></Typography>
                <Divider/>
                <Typography style={{paddingTop: 10, paddingBottom: 10}} component="p">
                  {`${this.props.machine.description}`}
                </Typography>
                <Divider/>
              </Grid>
            </Grid>

            <Grid style={{marginTop: 12}} container justify="center">
              <Grid item xs={10}>
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
                <InputLabel htmlFor="duration">Duration</InputLabel>
                <br/>
                <Input
                  style={{maxWidth: 80}}
                  value={20}
                  endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDialogClose} variant="raised" color="default">
            Discard
          </Button>
          <Button onClick={this.handleSave} variant="raised" color="primary" autoFocus>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(ReservationModifyDialog);
