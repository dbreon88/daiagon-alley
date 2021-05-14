/* Main file to manage our communication with the ethereum blockchain using 
the ethers library. My contract is currently deployed on the kovan test 
network.  

Note: I am using the default ethers provider to connect to the kovan network.
This throttles and is not suitable for production. */
const { ethers, BigNumber } = require("ethers");
var utils = require("ethers").utils;
const { calculateAave, calculateCompound, calculateDsr } = require("./utils");
let provider = ethers.getDefaultProvider("kovan");
const db = require("./db");

//Address of my contract deployed on the Kovan test net
const address = "0xed3957cc5c4f267269fd8736e0568a9f3942c2ee";

//ABI of my contract
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

/* Set up an event listener to listen for new blocks. For each new ETH block, query the rates and
add them to a new row in the db. 
In a production enviroment this would best be run in a background process to prevent flooding 
my network with requests */
// TODO uncomment this to start listener. It is commented out to prevent too much traffic on the network

// provider.on("block", async function (blockNumber) {
//   try {
//     let [compoundRate, daiSavingsRate, aaveRate] = await contract.getRates();
//     compoundRate = calculateCompound(compoundRate);
//     daiSavingsRate = calculateDsr(daiSavingsRate);
//     aaveRate = calculateAave(aaveRate); //check this TODO
//     //console.log("Rates: ", compoundRate, daiSavingsRate, aaveRate);
//     await db.query(
//       "INSERT INTO rates(block_number, compound, dsr, aave) VALUES ($1, $2, $3, $4);",
//       [blockNumber, compoundRate * 100, daiSavingsRate * 100, aaveRate * 100]
//     );
//   } catch (err) {
//     console.error("Error Adding Newest Block Info to DB!! ", err);
//   }
// });

module.exports = contract;
