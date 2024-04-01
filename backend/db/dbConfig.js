const mysql = require("mysql2");

const dbConnection = mysql.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "193.203.166.18",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

// dbConnection.query("SELECT 'test'", (err, results) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(results);
//   }
// });

module.exports = dbConnection.promise();
