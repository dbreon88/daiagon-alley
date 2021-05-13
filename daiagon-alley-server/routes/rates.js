var express = require("express");
var router = express.Router();
const { ethers, BigNumber } = require("ethers");
var utils = require("ethers").utils;
const contract = require("../ether.js");
const db = require("../db");

// TODO MOVE THESSE TO COMMON FOLDER
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
  return rate; //Returns a Number. maybe change this TODO
};

const calculateAave = (rate, decimals) => {
  const numberString = utils.formatUnits(rate, 27);
  return parseFloat(numberString);
};

router.get("/", async function (req, res, next) {
  console.log("GET / CALLED");
  try {
    console.log("contract address: ", contract.address);
    let rates = await contract.getRates();
    console.log("All 3 Rates: ", rates);
    res.send([
      calculateCompound(rates[0]),
      calculateDsr(rates[1]),
      calculateAave(rates[2]),
    ]);
  } catch (err) {
    next(err);
  }
});

/* Get the rates for all 3 providers for all the highest 128 blocks stored in the database. 
This will represent the most recent 128 blocks as the database should have the most recent blocks */
router.get("/past", async function (req, res, next) {
  try {
    const compound = await db.query(
      "select cast (block_number as INTEGER) as x, compound as y from rates where block_number >= (select max(block_number) from rates) - 128"
    );
    const dsr = await db.query(
      "select cast (block_number as INTEGER) as x, dsr as y from rates where block_number >= (select max(block_number) from rates) - 128"
    );
    const aave = await db.query(
      "select cast (block_number as INTEGER) as x, aave as y from rates where block_number >= (select max(block_number) from rates) - 128"
    );
    const result = [
      { id: "Compound", color: "hsl(157, 76%, 46%)", data: compound.rows },
      { id: "DSR", color: "hsl(261, 37%, 16%)", data: dsr.rows },
      { id: "Aave", color: "hsl(186, 56%, 47%)", data: aave.rows },
    ];
    res.send(result);
  } catch (err) {
    // throw { message: "Error Querying from database!", status: 500 };
    console.log("Error Selecting rates from database: ", err);
    //next(err); //TODO check this
  }
});

/* This function also gets the past rates but returns it row by row as it is structured in the db. 
The above function is currently used as the front end graph library wants a list of block number + rate 
pairings for each line on the graph. */
//router.get("/past", async function (req, res, next) {
//   console.log("Past Rates called");

//   db.query(
//     "select * from rates where block_number >= (select max(block_number) from rates) - 128",
//     (err, result) => {
//       if (err) {
//         // throw { message: "Error Querying from database!", status: 500 };
//         console.log("Error Selecting rates from database: ", err);
//         next(err); //TODO check this
//       }

//       console.log("Result from past rates query: ", result.rows);
//       res.send(result.rows);
//     }
//   );
// });

module.exports = router;
