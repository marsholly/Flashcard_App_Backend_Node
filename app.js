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
//  get a category question  /question/category
//  get answer  /answer/:id

app.get('/question', (req, res) => {
  FlashCard.getQuestion((err, question) => {
    if(err) {
      return res.status(400).send(err);
    }
    res.send(question);
  })
});

app.post('/question', (req, res) => {
  FlashCard.createQuestion(req.body, err => {
    if(err) return res.status(400).send(err);
    res.send('success');
  });
});


app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
