const { Configuration, OpenAIApi } = require("openai");
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
require("dotenv").config();
const app = express();
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
//   }

module.exports = app;


//
const configuration = new Configuration({
  organization: "org-lhOCdYxB9FUo5qAvqq2cqWcU",
  apiKey: process.env.REACT_APP_OPENAI_SECRET,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


// middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())


// app routes if any

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')));

//static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/', async (req, res) => {
    console.log("req body,", req.body)
    const { message, currentModel } = req.body
    console.log("BACK END MESSAGE!!!-->", message)
    // console.log("BACK END CURR MODEL!!!-->", currentModel)
    const { data } = await openai.createCompletion({
        model: currentModel,
        prompt: message,
        max_tokens: 100,
        temperature: 0.5,
      });
      console.log(data.choices[0].text);
    console.log("MESSAGE", message)
      res.json({
        // data: data,
        message: data.choices[0].text
      })
})

app.get('/models', async(req, res)=>{

    const response = await openai.listEngines();
    console.log("responses: ", response.data.data)
    res.json({
        models: response.data.data
    })
    
})
// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
});

// send index.html
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
});


// error handling
app.use((err, req, res, next)=>{
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error')
})