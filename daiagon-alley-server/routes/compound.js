/* All the routes for grabbing data related to the Compound Finance Platform. 
It calls my smart contract (currently deployed on the kovan network) to 
get the current dai interest rate from Compound
 */
var express = require("express");
var router = express.Router();
const { ethers, BigNumber } = require("ethers");
const { calculateCompound } = require("../utils");
const contract = require("../ether.js");

//On GET to /compound -> call my contract to get compound supply rate.
router.get("/", async function (req, res, next) {
  try {
    let supplyRate = await contract.getSupplyRate();
    // console.log("Compound Finance Rate: ", supplyRate);
    supplyRate = calculateCompound(supplyRate);
    res.send({ rate: supplyRate });
  } catch (err) {
    console.log(
      "Error Retrieving the current rate from Compound Finance: ",
      err
    );
    //next(err);
  }
});

module.exports = router;
