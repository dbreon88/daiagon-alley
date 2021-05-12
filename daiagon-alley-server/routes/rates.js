var express = require("express");
var router = express.Router();
const { ethers } = require("ethers");
const contract = require("../ether.js");
const db = require("../db");

router.get("/", async function (req, res, next) {
  try {
    console.log("contract address: ", contract.address);
    let rates = await contract.getRates();
    console.log("All 3 Rates: ", rates);
    res.send(rates);
  } catch (err) {
    next(err);
  }
});

router.get("/past", async function (req, res, next) {
  console.log("Past Rates called");
  db.query(
    "select * from rates where block_number >= (select max(block_number) from rates) - 128",
    (err, res) => {
      if (err) {
        // throw { message: "Error Querying from database!", status: 500 };
        console.log("Error Selecting rates from database: ", err);
        next(err); //TODO check this
      }

      console.log("Result from past rates query: ", res);
      res.send(res);
    }
  );
});

module.exports = router;
