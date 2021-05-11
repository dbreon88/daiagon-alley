var express = require("express");
var router = express.Router();
const { ethers } = require("ethers");
const contract = require("../ether.js");

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

module.exports = router;
