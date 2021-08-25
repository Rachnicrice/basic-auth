'use strict';


const { app } = require('../src/server.js');
const authMW = require('../src/auth/auth-mw.js');
const { sequelize } = require('../src/schemas/index.js');
const supertest = require('supertest');
const { it, expect } = require('@jest/globals');
const mockRequest = supertest(app);

// POST to /signup to create a new user
// POST to /signin to login as a user (use basic auth)
// Need tests for auth middleware and the routes
// Does the middleware function (send it a basic header)
// Do the routes assert the requirements (signup/signin)

describe('Auth Route testing', () => {

  beforeEach(async () => {
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.drop();
  });

  it('can go to /signup and create a new user', async () => {
    let results = await mockRequest.post('/signup').send({username:'john', password:'foo'});
    expect(results.body).toBeDefined();
    expect(results.status).toEqual(200);
  });

  it('Auth middleware can validate an existing user', async () => {
    // let req = {
    //   headers: {
    //     authorization: ['Basic', 'sdkjdsljd='],
    //   },
    // };

    // let res = {};

    // await mockRequest.post('/signup').send({username:'john', password:'foo'});
    // let results = await authMW(req, res);
    // console.log(results);
  });

  it('can go to /signin and log in if existing user', async () => {
    await mockRequest.post('/signup').send({username:'john', password:'foo'});
    let results = await mockRequest.post('/signin').auth('john', 'foo');
    expect(results.status).toEqual(200);
  });


  it('will fail on bad login info', () => {

  });


});
