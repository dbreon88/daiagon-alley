/* This is the home page which displays the current rate for 
all three of the providers side by side */

import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getCurrentRates } from "../models/rates";
import ReactLoading from "react-loading";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  loading: { alignItems: "center", justifyContent: "center" },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function Home() {
  const classes = useStyles();
  const [compound, setCompound] = useState(null);
  const [dsr, setDsr] = useState(null);
  const [aave, setAave] = useState(null);

  const loadData = async () => {
    try {
      const rateData = await getCurrentRates();
      //console.log("CURRENT RATE DATA: ", rateData.data);
      setCompound(rateData.data[0] * 100);
      setDsr(rateData.data[1] * 100);
      setAave(rateData.data[2] * 100);
    } catch (err) {
      console.log("Error fetching current rate data: ", err);
      alert(
        "There was an error fetching the data for this page. Please try again later."
      );
    }
  };

  useEffect(() => {
    loadData(); //On first page load, fetch the data from the model.
  }, []);
  return (
    <>
      {aave === null || dsr === null || compound === null ? (
        <div className={classes.container}>
          <ReactLoading
            type={"cubes"}
            color={"blue"}
            height={"10%"}
            width={"40%"}
          />
        </div>
      ) : (
        <Grid
          container
          spacing={10}
          direction="row"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  Compound Interest Rate
                </Typography>
                <Typography variant="h2" component="h2">
                  {compound.toFixed(2)}%
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Percent APY
                </Typography>
                <Typography variant="body2" component="p">
                  This is the current interest rate <br /> on the
                  Compound.finance platform.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="https://compound.finance">
                  Visit Site
                </Button>
                <Button size="small" href="/history">
                  See Graph
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  Dai Savings Rate
                </Typography>
                <Typography variant="h2" component="h2">
                  {dsr.toFixed(2)}%
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Percent APY
                </Typography>
                <Typography variant="body2" component="p">
                  This is the current interest rate <br /> from MakeDAO's Dai
                  Savings rate.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="https://makerdao.com/en/">
                  Visit Site
                </Button>
                <Button size="small" href="/history">
                  See Graph
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  Aave Interest Rate
                </Typography>
                <Typography variant="h2" component="h2">
                  {aave.toFixed(2)}%
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Percent APY
                </Typography>
                <Typography variant="body2" component="p">
                  This is the current interest rate <br /> on the Aave lending
                  platform.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="https://aave.com">
                  Visit Site
                </Button>
                <Button size="small" href="/history">
                  See Graph
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Home;
