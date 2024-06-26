const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  // console.log(authHeader);
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username: decoded.username, usersid: decoded.usersid }; // Attach user info to request
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Token is not valid" });
  }
}

module.exports = authMiddleware;
