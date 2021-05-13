/* All the routes for grabbing data related to the Compound Finance Platform. 
It calls my smart contract (currently deployed on the kovan network) to 
get the current dai interest rate from Compound
 */
var express = require("express");
var router = express.Router();
const { ethers, BigNumber } = require("ethers");
const contract = require("../ether.js");

//Take the returned rates from the contract and convert them into a percent interest rate
//Note: the numbers are returned as Ethers type BigNumber and the BigNumber functions must be used.
const calculateCompound = (rate) => {
  rate = rate.toNumber(); //The compound rate should be small enough to convert to js number. CHECK THIS TODO
  const ethMantissa = 1e18;
  const blocksPerDay = 6570; // 13.15 seconds per block
  const daysPerYear = 365;
  const supplyApy =
    (Math.pow((rate / ethMantissa) * blocksPerDay + 1, daysPerYear) - 1) * 100;
  //console.log(`Supply APY for ETH with compound ${supplyApy} %`);
  return supplyApy;
};

//TODO convert this
//On GET to /compound -> call my contract to get compound supply rate.
router.get("/", async function (req, res, next) {
  try {
    let supplyRate = await contract.getSupplyRate();
    // console.log("Compound Finance Rate: ", supplyRate);
    supplyRate = calculateCompound(supplyRate);
    res.send(supplyRate);
  } catch (err) {
    console.log(
      "Error Retrieving the current rate from Compound Finance: ",
      err
    );
    //next(err);
  }
});

module.exports = router;
