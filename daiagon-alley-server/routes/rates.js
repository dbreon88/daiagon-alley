/* Routes for grabbing data from all three platforms. 
It calls my smart contract (currently deployed on the kovan network) to 
get the current rates on the platforms.
 */

var express = require("express");
var router = express.Router();
const { ethers, BigNumber } = require("ethers");
const { calculateAave, calculateDsr, calculateCompound } = require("../utils");
var utils = require("ethers").utils;
const contract = require("../ether.js");
const db = require("../db");

//On GET to rates/ -> Call my smart contract to get all three of the interest rates
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
  }
});

/* This function also gets the past rates but returns it row by row as it is structured in the db. 
The other function is currently used as the front end graph library wants a list of block number + rate 
pairings for each line on the graph. */
// router.get("/past", async function (req, res, next) {
//   console.log("Past Rates called");
//   try {
//   let result = db.query(
//     "select * from rates where block_number >= (select max(block_number) from rates) - 128"
//   );
//   console.log("Result from past rates query: ", result.rows);
//   res.send({result.rows});
//   }
//   catch(err) {
//     console.log("Error getting past rates from database: ", err)
//   }
// });

module.exports = router;
