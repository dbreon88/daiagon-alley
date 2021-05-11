var express = require("express");
var router = express.Router();
const { ethers } = require("ethers");
const contract = require("../ether.js");

//Call contract to get Aave liquidity rate which is the interest rate for the Aave platform.
router.get("/", async function (req, res, next) {
  let liquidityRate = await contract.getAaveLiquidityRate();
  console.log("Aave Liquididty Rate: ", liquidityRate);
  res.send(liquidityRate);
});

module.exports = router;
