'use strict';

const authMW = require('../auth/auth-mw.js');
const Users = require('../schemas/user.schema.js');
const { app } = require('../server.js');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
app.post('/signup', async (req, res) => {
  try {
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', authMW, async (req, res) => {
  try {
    if (req.validUser) {
      res.status(200).json(req.validUser);
    }
  } catch (e) { res.status(403).send('Invalid Login'); }

});