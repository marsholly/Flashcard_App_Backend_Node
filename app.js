'use strict'
const PORT = 8000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const FlashCard = require('./models/flashCard');
const ExtraFlashCard = require('./models/extraFlashCard');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let id;
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
    id = questionObj.id;
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
  let _id = req.params.id;
  FlashCard.removeOneQuestion(_id, err => {
    if(err) return res.status(400).send(err);
    res.send('done');
  });
});

// update a question
app.put('/question/:id', (req, res) => {
  let _id = req.params.id;
  FlashCard.updateOneQuestion(_id, req.body, (err, question) => {
    if(err) return res.status(400).send(err);
    res.send(question);
  });
})

//  get a category question  /question/category
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

//  get answer  /answer
app.get('/answer',(req, res) => {
  FlashCard.getOneQuestion(id, (err, question) => {
    if(err) {
      return res.status(400).send(err);
    }
    let answer =`The answer is: ${question.answer}`;
    res.send(answer);
  })
});


// Extra Features
app.get('/extraQuestion', (req, res) => {
  ExtraFlashCard.getAllQuestions((err, questions) => {
    if(err) {
      return res.status(400).send(err);
    }
    let total = questions.length;
    let index = Math.floor(Math.random() * total);
    let questionObj = questions[index];
    id = questionObj.id;
    let question = `[ ${questionObj.category} ] Q: ${questionObj.question} \n ${questionObj.answer}`;
    res.send(question);
  })
});

app.post('/extraQuestion', (req, res) => {
  ExtraFlashCard.createQuestion(req.body, err => {
    if(err) return res.status(400).send(err);
    res.send('success');
  });
});

app.get('/correctAnswer',(req, res) => {
  ExtraFlashCard.getOneQuestion(id, (err, question) => {
    if(err) {
      return res.status(400).send(err);
    }
    let answer =`The answer is: ${question.correct}`;
    res.send(answer);
  })
});

app.delete('/extraQuestion/:id',(req, res) => {
  let _id = req.params.id;
  ExtraFlashCard.removeOneQuestion(_id, err => {
    if(err) return res.status(400).send(err);
    res.send('done');
  });
});

app.put('/extraQuestion/:id', (req, res) => {
  let _id = req.params.id;
  ExtraFlashCard.updateOneQuestion(_id, req.body, (err, question) => {
    if(err) return res.status(400).send(err);
    res.send(question);
  });
})

app.get('/extraQuestion/:category',(req, res) => {
  ExtraFlashCard.getAllQuestions((err, questions) => {
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
    let question = `[ ${questionObj.category} ] Q: ${questionObj.question} \n ${questionObj.answer}`;
    res.send(question);
  })
});

app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
