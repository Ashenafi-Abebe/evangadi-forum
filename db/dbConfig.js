const mysql = require("mysql2");

const dbConnection = mysql.createPool({
  user: "evangadi-admin",
  database: "evangadi_db",
  host: "localhost",
  password: "123456",
  connectionLimit: 10,
  port: 3307,
});

// dbConnection.query("SELECT 'test'", (err, results) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(results);
//   }
// });

module.exports = dbConnection.promise();
