const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { app, runServer, closeServer } = require('../app/server');
const { User } = require('../app/user/router');
const { TEST_DATABASE_URL, JWT_SECRET } = require('../app/config');
const expect = chai.expect;
chai.use(chaiHttp);
