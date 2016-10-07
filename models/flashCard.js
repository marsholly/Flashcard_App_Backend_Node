const fs = require('fs');
const path = require('path');
const questionPath = path.join(__dirname, '../data/flashcard.json');

exports.getQuestion = function(cb) {
  fs.readFile(questionPath, (err, buffer) => {
    if (err) return cb(err);
    let data;
    try {
      data = JSON.parse(buffer);
    } catch(e) {
      data = [];
    }
    // console.log('data:', data);
    cb(null, data);
  });
}

exports.write = function(newData, cb) {
  let json = JSON.stringify(newData);
  fs.writeFile(questionPath, json, cb);
}
