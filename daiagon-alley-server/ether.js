const { ethers, BigNumber } = require("ethers");
var utils = require("ethers").utils;
let provider = ethers.getDefaultProvider("kovan");
const db = require("./db");

const address = "0xed3957cc5c4f267269fd8736e0568a9f3942c2ee";
const abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "getAaveLiquidityRate",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getDaiSavingsRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getRates",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getSupplyRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
//var wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(address, abi, provider);

//These functions take in the returned rates from the contract and convert them into a percent interest rate
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

//For more Info: https://docs.makerdao.com/smart-contract-modules/rates-module
const calculateDsr = (rate) => {
  rate = BigNumber.from("0x33B2E3CA2026060221A2192"); //Uncomment to test TODO RE COMMENT: Here is an example test rate from the docs to show that it properly converts it

  const numberString = utils.formatUnits(rate, 27);
  rate = parseFloat(numberString);
  rate = Math.pow(rate, 31536000);
  rate -= 1.0;
  return rate; //Returns a Numeber. maybe change this TODO
};

const calculateAave = (rate, decimals) => {
  const numberString = utils.formatUnits(rate, 27);
  return parseFloat(numberString);
};

//Set up an event listener to listen for new blocks. For each new ETH block, query the rates and
//add them to a new row in the db. UNCOMMENT TODO
// provider.on("block", async function (blockNumber) {
//   try {
//     let [compoundRate, daiSavingsRate, aaveRate] = await contract.getRates();
//     compoundRate = calculateCompound(compoundRate);
//     daiSavingsRate = calculateDsr(daiSavingsRate);
//     aaveRate = calculateAave(aaveRate); //check this TODO
//     //console.log("Rates: ", compoundRate, daiSavingsRate, aaveRate);
//     db.query(
//       "INSERT INTO rates(block_number, compound, dsr, aave) VALUES ($1, $2, $3, $4);",
//       [blockNumber, compoundRate * 100, daiSavingsRate * 100, aaveRate * 100],
//       (err, res) => {
//         if (err) {
//           throw { message: "Error Querying from database!", status: 500 };
//         }
//         // console.log("Insert Result: ", res);
//         console.log("Inserted data for block #: ", blockNumber);
//       }
//     );
//   } catch (err) {
//     console.error("Error Adding Newest Block Info to DB!! ", err);
//   }
// });

module.exports = contract;
