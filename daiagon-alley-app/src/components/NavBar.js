/*Nav bar component displayed on every page */

import React from "react";

import { AppBar, Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  authButton: {
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkStyle: {
    textDecoration: "none",
    color: "#fafafa",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              <Link className={classes.linkStyle} to="/">
                Daiagon Alley
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default NavBar;
