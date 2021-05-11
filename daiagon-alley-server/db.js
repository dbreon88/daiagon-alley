// //File to manage connections with postgres database
// const { Client } = require("pg");
// let client = null;

// // create a connection to url and call callback()
// function connect(options, callback) {
//   if (client == null) {
//     // create a postgres client
//     client = new Client(options);
//     // establish a new connection
//     client.connect((err) => {
//       if (err) {
//         // error occurred during connection. Test this
//         client = null;
//         callback(err);
//       } else {
//         // all done
//         callback();
//       }
//     });
//   } else {
//     // connection was established earlier. just call callback()
//     callback();
//   }
// }

// // get database using pre-established connection
// // function db(dbName) {
// //   return client.db(dbName);
// // }

// // close open connection
// function close() {
//   if (client) {
//     client
//       .end()
//       .then(() => console.log("postgres client has disconnected"))
//       .catch((err) =>
//         console.error("error during disconnection with postgres", err.stack)
//       );
//     client = null;
//   }
// }

// // export connect(), db() and close() from the module
// module.exports = {
//   connect,
//   //   db,
//   close,
// };

const { Pool } = require("pg");
let pool = null;

// create a connection to url and call callback()
function connect(callback) {
  if (pool == null) {
    try {
      console.log("Initializing postgres pool...");
      // create a postgres pool. This will automatically use enviroment variables.
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
const query = (text, params, callback) => {
  const start = Date.now();
  return pool.query(text, params, (err, res) => {
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: res.rowCount });
    callback(err, res);
  });
};

//If you have a more intensive transaction and need to check out a client. Make sure to release client when using this.
const getClient = (callback) => {
  pool.connect((err, client, done) => {
    const query = client.query;
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args;
      return query.apply(client, args);
    };
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error("A client has been checked out for more than 5 seconds!");
      console.error(
        `The last executed query on this client was: ${client.lastQuery}`
      );
    }, 5000);
    const release = (err) => {
      // call the actual 'done' method, returning this client to the pool
      done(err);
      // clear our timeout
      clearTimeout(timeout);
      // set the query method back to its old un-monkey-patched version
      client.query = query;
    };
    callback(err, client, release);
  });
};

module.exports = {
  query,
  connect,
  getClient,
};
