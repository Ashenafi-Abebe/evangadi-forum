// db connection
const dbConnection = require("../dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !firstname || !lastname || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required fields" });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username,usersid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already exists." });
    }
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "the password must be at list 8 charactre " });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedpasword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedpasword]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "user registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required feilds" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username,usersid,password FROM users WHERE  email = ?",
      [email]
    );

    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credentials" });
    }

    // compare password

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credentials" });
    }
    return res.json({ user: user[0].password });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
}

async function checkUser(req, res) {
  res.send("checkUser");
}

module.exports = { register, login, checkUser };
