'use strict';

const express = require('express');

const app = express();
const bcrypt = require('bcrypt');
const { Users } = require('./app');
const basicAuth = require('./middleware/basic-auth');
const errorHandler = require('./middleware/error-handlers/500');
const notFound = require('./middleware/error-handlers/404');


// Processes JSON requests
app.use(express.json());

// Processes FORM requests
app.use(express.urlencoded({ extended: true }));

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
app.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', basicAuth, async (req, res) => {
  res.status(200).json('hello there!');
});

app.get('/protected', basicAuth, async (req, res) => {
  res.status(200).json('This is a protected branch. You have access!');
});

app.use('*', notFound);

app.use(errorHandler);


module.exports = { app };