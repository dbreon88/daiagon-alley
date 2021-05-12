import axios from "axios";

/**
 * This is a model to store the data received for
 * the database for the controller to talk to.
 */

//This function gets all rates for any block <= 128 blocks behind the most recent block in the database
export const getPastRates = async () => {
  try {
    const data = await axios.get(`http://localhost:5000/rates/past`);
    return data;
  } catch (err) {
    console.log("Error Calling Backend To Get Rates: ", err);
  }
};

// module.exports = { getPastRates };
