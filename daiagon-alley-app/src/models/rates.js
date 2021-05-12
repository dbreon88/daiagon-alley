import axios from "axios";
import utils from "../utils";

/**
 * This is a model to store the data received for
 * the database for the controller to talk to.
 */

//This function gets all rates for any block <= 128 blocks behind the most recent block in the database
export const getPastRates = async () => {
  try {
    let data = await axios.get(`http://localhost:5000/rates/past`);
    return data;
  } catch (err) {
    console.log("Error Calling Backend To Get Rates: ", err);
  }
};

export const getCurrentRates = async () => {
  try {
    let data = await axios.get(`http://localhost:5000/rates/`);
    return data;
  } catch (err) {
    console.log("Error Calling Backend To Get Rates: ", err);
  }
};

// module.exports = { getPastRates };
