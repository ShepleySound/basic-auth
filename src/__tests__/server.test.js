'use strict';

const supertest = require('supertest');
const { app } = require('../server');
const { sequelizeDB } = require('../app');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDB.sync();
});

afterAll(async () => {
  await sequelizeDB.drop();
});

describe('Test API Server', () => {

  test('404 on invalid route.', async () => {
    const response = await request.get('/definitelydoesnotexist');
    expect(response.status).toEqual(404);
  });

  test('404 on invalid route.', async () => {
    const response = await request.get('/also/does/not/exist');
    expect(response.status).toEqual(404);
  });

  test('Test root route.', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });
});

describe('Test auth functionality', () => {
  test('Valid user signup.', async () => {
    const response = await request.post('/signup').send({
      username: 'testUser',
      password: 'helloworld123',
    });
    expect(response.status).toEqual(201);
  });

  test('Correct user login.', async () => {
    const encodedAuth = Buffer.from('testUser:helloworld123').toString('base64');
    const response = await (await request
      .post('/signin')
      .set('Authorization', 'basic ' + encodedAuth));
    expect(response.status).toEqual(200);
  });

  test('Incorrect user login.', async () => {
    const encodedAuth = Buffer.from('testUser:hellowrld12').toString('base64');
    const response = await (await request
      .post('/signin')
      .set('Authorization', 'basic ' + encodedAuth));
    expect(response.status).toEqual(401);
  });

  test('Access protected route with valid auth header.', async () => {
    const encodedAuth = Buffer.from('testUser:helloworld123').toString('base64');
    const response = await (await request
      .get('/protected')
      .set('Authorization', 'basic ' + encodedAuth));
    expect(response.status).toEqual(200);
  });

  test('Deny access to protected route with invalid auth header', async () => {
    const encodedAuth = Buffer.from('testUser:hellold123').toString('base64');
    const response = await (await request
      .get('/protected')
      .set('Authorization', 'basic ' + encodedAuth));
    expect(response.status).toEqual(401);
  });

});