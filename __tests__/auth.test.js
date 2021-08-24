'use strict';


const { app } = require('../src/server.js');
const authMW = require('../src/auth/auth-mw.js');
const supertest = require('supertest');
const { it, expect } = require('@jest/globals');
const mockRequest = supertest(app);

// POST to /signup to create a new user
// POST to /signin to login as a user (use basic auth)
// Need tests for auth middleware and the routes
// Does the middleware function (send it a basic header)
// Do the routes assert the requirements (signup/signin)

describe('Auth Route testing', () => {

  it('can go to /signup and create a new user', async () => {
    let results = await mockRequest.post('/signup').send({username:'john', password:'foo'});
    expect(results.body).toBeDefined();
    expect(results.status).toEqual(200);
  });

  it('can go to /signing and log in if existing user', () => {
    mockRequest.post('/signin');

  });

  it('Auth middleware can validate an existing user', () => {

  });

  it('will fail on bad login info', () => {

  });


});
