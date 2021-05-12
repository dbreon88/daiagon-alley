var express = require("express");
var router = express.Router();
const { ethers } = require("ethers");
const contract = require("../ether.js");

//TODO convert this
//Call my contract to get compound supply rate which is the interest rate for the compound platform.
router.get("/", async function (req, res, next) {
  try {
    let supplyRate = await contract.getSupplyRate();
    console.log("Compound Finance Rate: ", supplyRate);
    res.send(supplyRate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
