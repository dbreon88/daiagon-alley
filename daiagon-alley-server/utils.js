//Utility functions

const { BigNumber } = require("ethers");
var utils = require("ethers").utils;

/* These functions take in the returned rates from the contract and convert them into a percent interest rate
Note: the numbers are returned as Ethers type BigNumber and the BigNumber functions must be used. */
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

/* Convert the returned value from MakerDAO's smart contract to the float rate
For more Info: https://docs.makerdao.com/smart-contract-modules/rates-module */
const calculateDsr = (rate) => {
  rate = BigNumber.from("0x33B2E3CA2026060221A2192"); //Uncomment to test TODO RE COMMENT: Here is an example test rate from the docs to show that it properly converts it
  const numberString = utils.formatUnits(rate, 27);
  rate = parseFloat(numberString);
  rate = Math.pow(rate, 31536000);
  rate -= 1.0;
  return rate; //Returns a Number type. maybe change this TODO
};

/* The Aave smart contract returns the result in Ray 
units. This converts Ray to a float representing the rate */
const calculateAave = (rate, decimals) => {
  console.log("util aave");
  const numberString = utils.formatUnits(rate, 27);
  return parseFloat(numberString);
};

module.exports = {
  calculateDsr,
  calculateAave,
  calculateCompound,
};
