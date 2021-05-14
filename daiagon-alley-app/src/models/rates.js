/**
 * This is a model to retrieve the data from our backend for
 * to be displayed in our views. (Using MVC design pattern)
 */

import axios from "axios";
import utils from "../utils";

//This function gets all rates for any block <= 128 blocks behind the most recent block in the database
export const getPastRates = async () => {
  try {
    let data = await axios.get(`http://localhost:5000/rates/past`);
    return data;
  } catch (err) {
    console.log("Error Calling Backend To Get Rates: ", err);
  }
};

//Get all three current rates
export const getCurrentRates = async () => {
  try {
    let data = await axios.get(`http://localhost:5000/rates/`);
    return data;
  } catch (err) {
    console.log("Error Calling Backend To Get Rates: ", err);
  }
};

//Get dsr rate
export const getDsrRate = async () => {
  try {
    let data = await axios.get(`http://localhost:5000/dsr/`);
    return data;
  } catch (err) {
    console.log("Error Calling Backend To Get Dsr Rate: ", err);
  }
};

//Get Compound rate
export const getCompoundRate = async () => {
  try {
    let data = await axios.get(`http://localhost:5000/compound/`);
    return data;
  } catch (err) {
    console.log("Error Calling Backend To Get Dsr Rate: ", err);
  }
};

//Get Aave rate
export const getAaveRate = async () => {
  try {
    let data = await axios.get(`http://localhost:5000/aave/`);
    return data;
  } catch (err) {
    console.log("Error Calling Backend To Get Aave Rate: ", err);
  }
};
