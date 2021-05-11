var express = require("express");
var router = express.Router();
const { ethers } = require("ethers");

let provider = ethers.getDefaultProvider("kovan");
const privateKey =
  "0x945e73f5c99d0415a28f83fb8715a5fe754728a2fd57dabb1fd0f32aa2347ed4";
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
const address = "0xd1325d76234422C00680898023556ed2BbD91D66";
var wallet = new ethers.Wallet(privateKey, provider);
var contract = new ethers.Contract(address, abi, provider);

router.get("/", async function (req, res, next) {
  console.log("contract address: ", contract.address);
  let dsrValue = await contract.getDaiSavingsRate();
  console.log("DSR VALUE: ", dsrValue);
  res.send(dsrValue);
});

module.exports = router;
