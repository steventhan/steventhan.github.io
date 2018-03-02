import React, { Component } from "react";
import { Grid, Typography } from "material-ui";


class Membership extends Component {
  render() {
    return (
      <Grid container style={{marginTop: 75}} justify="center" alignItems="center" spacing={0}>
        <Grid item>
          <Typography>This page will contain membership information</Typography>
        </Grid>
      </Grid>
    )
  }
}

export default Membership;
