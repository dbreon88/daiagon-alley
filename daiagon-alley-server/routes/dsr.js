var express = require("express");
var router = express.Router();
const { ethers } = require("ethers");
const contract = require("../ether.js");

//TODO : convert this
router.get("/", async function (req, res, next) {
  try {
    console.log("contract address: ", contract.address);
    let dsrValue = await contract.getDaiSavingsRate();
    console.log("DSR VALUE: ", dsrValue);
    res.send(dsrValue);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
