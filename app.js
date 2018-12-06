const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();
app.use(express.static(__dirname));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);

app.get('',function(req,res){
  console.log('directing to login')
  res.sendFile(__dirname + '\\haileysignup.html');
  //It will find and locate index.html from View or Scripts
});

app.get("/home",function(req,res){
  console.log('directing to home')
  res.sendFile(__dirname + '\\HomePage.html');
  //It will find and locate index.html from View or Scripts
});

app.get("/courses",function(req,res){
  console.log('directing to courses')
  res.sendFile(__dirname + '\\Courses.html');
  //It will find and locate index.html from View or Scripts
});

app.get("/grades",function(req,res){
  console.log('directing to grades')
  res.sendFile(__dirname + '\\Grades.html');
  //It will find and locate index.html from View or Scripts
});

app.get("/schedule",function(req,res){
  console.log('directing to home')
  res.sendFile(__dirname + '\\Schedule.html');
  //It will find and locate index.html from View or Scripts
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to StudySmart!',
// }));

module.exports = app;