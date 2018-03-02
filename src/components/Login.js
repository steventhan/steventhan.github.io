import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Checkbox, Button, Typography, Grid, TextField, FormControlLabel } from 'material-ui';


class Login extends Component {
  componentWillMount = () => {
    this.props.onLogout();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    return (
      <Grid container style={{height: "100vh"}} spacing={0} justify="center" alignItems="center">
        <Grid item xs={9} style={{marginTop: -80}}>
          <form>
            <Typography variant="display3" align="center">
              Marino
            </Typography>
            <TextField
              id="email"
              label="Husky email"
              margin="normal"
              required
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              required
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              component={Link}
              to="/dashboard"
              variant="raised"
              color="primary"
              onClick={this.props.onLogin}
              fullWidth>
              Log in
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
