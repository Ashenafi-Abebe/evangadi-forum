const dbConnection = require("../dbConfig");

async function postAnswer(req, res) {
  const { usersid, questionid, answer } = req.body;
  console.log(req.body);
  if (!questionid || !usersid || !answer) {
    return res.status(400).json({ msg: "please  provide all required fields" });
  }
  //insert data into answers table
  try {
    await dbConnection.query(
      "INSERT INTO answers (usersid,questionid,answer) VALUES (?,?,?)",
      [usersid, questionid, answer]
    );
    return res.status(201).json({ msg: "answer posted" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "something went wrong, try again later" });
  }
}
async function allAnswer(req, res) {
  // const questionid = req.query.questionid;

  const questionId = req.headers["questionid"];
  // console.log(questionId)
  try {
    const [allanswer] = await dbConnection.query(
      "SELECT answer from answers where questionid=?",
      [questionId]
    );
    return res
      .status(200)
      .json({ msg: "all answer retrieved succesfully", allanswer });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "something went wrong, try again later" });
  }
}

module.exports = { postAnswer, allAnswer };
