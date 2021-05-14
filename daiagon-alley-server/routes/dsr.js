/* All the routes for grabbing data related to the Dai Savings Rate (created by MakerDAO). 
It calls my smart contract (currently deployed on the kovan network) to 
get the current dai savings rate (AKA interest rate) from MakerDao
 */
var express = require("express");
var router = express.Router();
const { ethers, BigNumber } = require("ethers");
const { calculateDsr } = require("../utils");
var utils = require("ethers").utils;
const contract = require("../ether.js");

/* Convert the returned value from MakerDAO's smart contract to the float rate
For more Info: https://docs.makerdao.com/smart-contract-modules/rates-module */
// const calculateDsr = (rate) => {
//   rate = BigNumber.from("0x33B2E3CA2026060221A2192"); //Uncomment to test TODO RE COMMENT: Here is an example test rate from the docs to show that it properly converts it

//   const numberString = utils.formatUnits(rate, 27);
//   rate = parseFloat(numberString);
//   rate = Math.pow(rate, 31536000);
//   rate -= 1.0;
//   return rate; //Returns a Number. maybe change this TODO
// };

//on GET call for /dsr -> call my smart contract to get the latest Dai Savings Rate
router.get("/", async function (req, res, next) {
  try {
    let dsrValue = await contract.getDaiSavingsRate();
    // console.log("DSR VALUE: ", dsrValue);
    dsrValue = calculateDsr(dsrValue);
    res.send({ rate: dsrValue });
  } catch (err) {
    console.log("Error Retrieving the current Dai Savings Rate: ", err);
  }
});

module.exports = router;
