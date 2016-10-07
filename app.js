'use strict'
const PORT = 8000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const FlashCard = require('./models/flashCard');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//  get question /question
app.get('/question', (req, res) => {
  FlashCard.getAllQuestions((err, questions) => {
    if(err) {
      return res.status(400).send(err);
    }
    //random questions and get one
    let total = questions.length;
    let index = Math.floor(Math.random() * total);
    let questionObj = questions[index];
    let question = `[ ${questionObj.category} ] Q: ${questionObj.question}`;
    res.send(question);
  })
});

// create a question
app.post('/question', (req, res) => {
  FlashCard.createQuestion(req.body, err => {
    if(err) return res.status(400).send(err);
    res.send('success');
  });
});

// delete a question
app.delete('/question/:id',(req, res) => {
  let id = req.params.id;
  FlashCard.removeOneQuestion(id, err => {
    if(err) return res.status(400).send(err);
    res.send('done');
  });
});

//  get a category question  /question/category
let id;
app.get('/question/:category',(req, res) => {
  FlashCard.getAllQuestions((err, questions) => {
    if(err) {
      return res.status(400).send(err);
    }
    let category = req.params.category;
    let newQuestionArr = questions.filter(question => {
      return question.category === category;
    })
    let total = newQuestionArr.length;
    let index = Math.floor(Math.random() * total);
    let questionObj = newQuestionArr[index];
    id = questionObj.id;
    let question = `[ ${questionObj.category} ] Q: ${questionObj.question}`;
    res.send(question);
  })
});

//  get answer  /answer/:id
app.get('/answer',(req, res) => {
  FlashCard.getOneQuestion(id, (err, question) => {
    if(err) {
      return res.status(400).send(err);
    }
    let answer =`The answer is: ${question.answer}`;
    res.send(answer);
  })
});


app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
