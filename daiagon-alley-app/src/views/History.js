import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RateGraph from "../components/RateGraph";
import { getPastRates } from "../models/rates";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    padding: "3%",
  },
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
});

export default function History() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const loadData = async () => {
    const rateData = await getPastRates();
    console.log("RATE DATA: ", rateData.data);
    setData(rateData.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={classes.root}>
      <RateGraph data={data} />
    </div>
  );
}
