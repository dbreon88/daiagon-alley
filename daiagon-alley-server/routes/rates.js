var express = require("express");
var router = express.Router();
const { ethers } = require("ethers");
const contract = require("../ether.js");

router.get("/", async function (req, res, next) {
  console.log("contract address: ", contract.address);
  let rates = await contract.getRates();
  console.log("DSR VALUE: ", rates);
  res.send(rates);
});

module.exports = router;
