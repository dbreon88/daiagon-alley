import React from "react";
import { Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RateGraph from "../components/RateGraph";

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

function Compound() {
  const classes = useStyles();
  const data = [
    {
      id: "japan",
      color: "hsl(271, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 40,
        },
        {
          x: "helicopter",
          y: 253,
        },
        {
          x: "boat",
          y: 136,
        },
        {
          x: "train",
          y: 136,
        },
        {
          x: "subway",
          y: 26,
        },
        {
          x: "bus",
          y: 30,
        },
        {
          x: "car",
          y: 190,
        },
        {
          x: "moto",
          y: 115,
        },
        {
          x: "bicycle",
          y: 99,
        },
        {
          x: "horse",
          y: 201,
        },
        {
          x: "skateboard",
          y: 155,
        },
        {
          x: "others",
          y: 287,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(215, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 262,
        },
        {
          x: "helicopter",
          y: 246,
        },
        {
          x: "boat",
          y: 39,
        },
        {
          x: "train",
          y: 10,
        },
        {
          x: "subway",
          y: 30,
        },
        {
          x: "bus",
          y: 151,
        },
        {
          x: "car",
          y: 98,
        },
        {
          x: "moto",
          y: 220,
        },
        {
          x: "bicycle",
          y: 67,
        },
        {
          x: "horse",
          y: 128,
        },
        {
          x: "skateboard",
          y: 227,
        },
        {
          x: "others",
          y: 280,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(28, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 116,
        },
        {
          x: "helicopter",
          y: 164,
        },
        {
          x: "boat",
          y: 274,
        },
        {
          x: "train",
          y: 108,
        },
        {
          x: "subway",
          y: 222,
        },
        {
          x: "bus",
          y: 58,
        },
        {
          x: "car",
          y: 294,
        },
        {
          x: "moto",
          y: 263,
        },
        {
          x: "bicycle",
          y: 107,
        },
        {
          x: "horse",
          y: 259,
        },
        {
          x: "skateboard",
          y: 10,
        },
        {
          x: "others",
          y: 244,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(205, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 21,
        },
        {
          x: "helicopter",
          y: 8,
        },
        {
          x: "boat",
          y: 292,
        },
        {
          x: "train",
          y: 43,
        },
        {
          x: "subway",
          y: 187,
        },
        {
          x: "bus",
          y: 173,
        },
        {
          x: "car",
          y: 251,
        },
        {
          x: "moto",
          y: 209,
        },
        {
          x: "bicycle",
          y: 249,
        },
        {
          x: "horse",
          y: 140,
        },
        {
          x: "skateboard",
          y: 131,
        },
        {
          x: "others",
          y: 123,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(169, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 65,
        },
        {
          x: "helicopter",
          y: 139,
        },
        {
          x: "boat",
          y: 63,
        },
        {
          x: "train",
          y: 112,
        },
        {
          x: "subway",
          y: 174,
        },
        {
          x: "bus",
          y: 178,
        },
        {
          x: "car",
          y: 149,
        },
        {
          x: "moto",
          y: 178,
        },
        {
          x: "bicycle",
          y: 245,
        },
        {
          x: "horse",
          y: 24,
        },
        {
          x: "skateboard",
          y: 23,
        },
        {
          x: "others",
          y: 292,
        },
      ],
    },
  ];
  return (
    <div className={classes.root}>
      <RateGraph data={data} />
    </div>
  );
}

export default Compound;
