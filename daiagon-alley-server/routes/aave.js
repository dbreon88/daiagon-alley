/* All the routes for grabbing data related to the Aave Platform. 
It calls my smart contract (currently deployed on the kovan network) to 
get the current dai interest rate on the Aave platform.
 */
var express = require("express");
var router = express.Router();
const { ethers, BigNumber, utils, Uint8Array } = require("ethers");
const contract = require("../ether.js");

/* The Aave smart contract returns the result in Ray 
units. This converts Ray to a float representing the rate */
const calculateAave = (rate, decimals) => {
  const numberString = utils.formatUnits(rate, 27);
  return parseFloat(numberString);
};

//on GET call to /aave -> Call contract to get Aave liquidity rate aka interest rate
router.get("/", async function (req, res, next) {
  try {
    let [liquidityRate, decimals] = await contract.getAaveLiquidityRate();
    liquidityRate = calculateAave(liquidityRate, decimals);
    console.log("Aave Liquididty Rate: ", liquidityRate);
    res.send({ rate: liquidityRate });
  } catch (err) {
    console.log("Error Getting AAVE rate: ", err);
    //next(err);
  }
});

module.exports = router;
