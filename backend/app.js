require("dotenv").config();

const express = require("express");
const app = express();
// const router = express.Router();
const port = 5000;

const cors = require("cors");
app.use(cors());
// db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware file
const userRoutes = require("./db/routes/userRoute");

// json middleware to extract josn data
const questionsRoutes = require("./db/routes/questionRoute");
const answerRoute = require("./db/routes/answeRoute");
const authMiddleware = require("./db/controller/middellware/authMiddleware");
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

// questions routes middleware
app.use("/api/questions", authMiddleware, questionsRoutes);
// arswer route middleware
app.use("/api/answers", answerRoute);
async function start() {
  try {
    const result = await dbConnection.execute("SELECT   'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listning on ${port}`);
    console.log(result);
  } catch (error) {
    console.log(error, error.message);
  }
}

start();
