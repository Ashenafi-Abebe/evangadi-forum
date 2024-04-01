const express = require("express");
const router = express.Router();
const {
  postQuestion,
  allQuestion,
} = require("../controller/quationController");
router.post("/postquestion", postQuestion);
//   authntecation middlewar
router.get("/all-questions", allQuestion);

module.exports = router;
