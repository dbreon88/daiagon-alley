import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RateGraph from "../components/RateGraph";
import { getPastRates } from "../models/rates";
import ReactLoading from "react-loading";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    // padding: "3%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  // bullet: {
  //   display: "inline-block",
  //   margin: "0 2px",
  //   transform: "scale(0.8)",
  // },
  // title: {
  //   fontSize: 14,
  // },
  // pos: {
  //   marginBottom: 12,
  // },
});

export default function History() {
  const classes = useStyles();
  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const rateData = await getPastRates();
      console.log("RATE DATA: ", rateData.data);
      setData(rateData.data);
    } catch (err) {
      console.log("Error fetching Data: ", err);
      alert(
        "There was an error fetching the data for this page. Please try again later."
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={classes.root}>
      {data === null ? (
        <div className={classes.container}>
          <ReactLoading
            type={"cubes"}
            color={"blue"}
            height={"10%"}
            width={"40%"}
          />
        </div>
      ) : (
        <RateGraph data={data} />
      )}
    </div>
  );
}
