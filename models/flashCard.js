const fs = require('fs');
const path = require('path');
const questionPath = path.join(__dirname, '../data/flashcard.json');
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

exports.removeOneQuestion = function(id, cb) {
  exports.getAllQuestions((err, questions) => {
    if(err) return cb(err);
    let newQuestions = questions.filter(question => question.id !== id);
    exports.write(newQuestions, cb);
  })
}
