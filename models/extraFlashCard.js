const fs = require('fs');
const path = require('path');
const questionPath = path.join(__dirname, '../data/extraFlashCard.json');
const uuid = require('uuid');

exports.getAllQuestions = function(cb) {
  fs.readFile(questionPath, (err, buffer) => {
    if (err) return cb(err);
    let data;
    try {
      data = JSON.parse(buffer);
    } catch(e) {
      data = [];
    }
    cb(null, data);
  });
}

exports.write = function(newData, cb) {
  let json = JSON.stringify(newData);
  fs.writeFile(questionPath, json, cb);
}

exports.createQuestion = function(newQuestion, cb) {
  exports.getAllQuestions((err, questions) => {
    if(err) return cb(err);
    newQuestion.id = uuid();
    questions.push(newQuestion);
    exports.write(questions, cb);
  });
}

exports.getOneQuestion = function(id, cb) {
  exports.getAllQuestions((err, questions) => {
    if(err) return cb(err);
    let question = questions.filter( q => q.id === id )[0];
    cb(null, question);
  });
}

exports.removeOneQuestion = function(_id, cb) {
  exports.getAllQuestions((err, questions) => {
    if(err) return cb(err);
    let newQuestions = questions.filter(question => question.id !== _id);
    exports.write(newQuestions, cb);
  })
}

exports.updateOneQuestion = function(_id, updateQuestion, cb) {
  exports.getAllQuestions((err, questions) => {
    if(err) return cb(err);
    let index = questions.findIndex(q => q.id === _id);
    if (index === -1) {
      return cb({error: "question not found."});
    }
    updateQuestion.id = _id;
    questions[index] = updateQuestion;
    exports.write(questions, cb);
    cb(null, updateQuestion);
  })
}
