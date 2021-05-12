var express = require("express");
var router = express.Router();
const { ethers, BigNumber, utils, Uint8Array } = require("ethers");
const contract = require("../ether.js");

//TODO concer this result
const calculateAave = (rate, decimals) => {
  const numberString = utils.formatUnits(rate, 27);

  //   const divisor = BigNumber.from("10").pow(BigNumber.from(20));
  //   rate = rate.div(divisor); // rate/[10^(decimal)]
  //   let rateNumber = rate.toNumber();
  //   rateNumber /= Math.pow(10, 7);
  //   console.log("rate number:", rateNumber);
  //   console.log(
  //     "rate Number converted to Big Number: ",
  //     BigNumber.from(rateNumber)
  //   );
  console.log("Rate as fraction: ", numberString);
  return parseFloat(numberString);
};

//Call contract to get Aave liquidity rate which is the interest rate for the Aave platform.
router.get("/", async function (req, res, next) {
  try {
    let [liquidityRate, decimals] = await contract.getAaveLiquidityRate();
    liquidityRate = calculateAave(liquidityRate, decimals);
    console.log("Aave Liquididty Rate: ", liquidityRate);
    res.send({ rate: liquidityRate });
  } catch (err) {
    console.log("Error Getting AAVE rate!");
    next(err);
  }
});

module.exports = router;
