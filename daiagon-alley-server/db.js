//File to create and manage connections with postgres database
const { Pool } = require("pg");
let pool = null;

// create a connection to url and call callback()
function connect(callback) {
  if (pool == null) {
    try {
      console.log("Initializing postgres pool...");
      // create a postgres pool instance. This will automatically use enviroment variables.
      pool = new Pool();
      callback();
    } catch (err) {
      pool = null;
      callback(err);
    }
  } else {
    // connection was established earlier. just call callback()
    callback();
  }
}

//to use a client in the pool and make a single query
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
}

//If you have a more intensive transaction and need to check out a client. Make sure to release client when using this.
async function getClient() {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error("A client has been checked out for more than 5 seconds!");
    console.error(
      `The last executed query on this client was: ${client.lastQuery}`
    );
  }, 5000);
  // monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout);
    // set the methods back to their old un-monkey-patched version
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
}

module.exports = {
  query,
  connect,
  getClient,
};
