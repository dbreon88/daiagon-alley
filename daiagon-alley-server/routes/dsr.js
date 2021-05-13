/* All the routes for grabbing data related to the Dai Savings Rate (created by MakerDAO). 
It calls my smart contract (currently deployed on the kovan network) to 
get the current dai savings rate (AKA interest rate) from MakerDao
 */
var express = require("express");
var router = express.Router();
const { ethers } = require("ethers");
const contract = require("../ether.js");

//TODO : convert this
//on GET call for /dsr -> call my smart contract to get the latest Dai Savings Rate
router.get("/", async function (req, res, next) {
  try {
    console.log("contract address: ", contract.address);
    let dsrValue = await contract.getDaiSavingsRate();
    // console.log("DSR VALUE: ", dsrValue);
    res.send(dsrValue);
  } catch (err) {
    console.log("Error Retrieving the current Dai Savings Rate: ", err);
    //next(err);
  }
});

module.exports = router;
