const express = require("express");
const app = express();
const port = 5000;

// db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware file
const userRoutes = require("./db/routes/userRoute");

// json middleware to extract josn data

app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

// questions routes middleware

// arswer route middleware

async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listning on ${port}`);
    console.log(result);
  } catch (error) {
    console.log(error, message);
  }
}

start();
