const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { app, runServer, closeServer } = require('../app/server');
const { User } = require('../app/user/model');
const { TEST_DATABASE_URL } = require('../app/config');
const expect = chai.expect;
chai.use(chaiHttp);


// Create 10 sets of randomish user data and insert into mongo
// function seedUserData() {
//   console.info('seeding user data');
//   const seedData = [];
//
//   for (let i = 1; i <= 10; i++) {
//     seedData.push(generateUserData());
//   }
//   return User.insertMany(seedData);
// }

describe('tests for /api/user', function() {
  let testUser;

  // Generates a User object
  function generateUserData() {
    return {
      firstName: `${faker.name.firstName()}`,
      lastName: `${faker.name.lastName()}`,
      username: `${faker.internet.userName()}`,
      password: `${faker.internet.password()}`
    };
  }

  // Deletes the database in order to make sure data does not stick around
  // before next test
  // function tearDownDb() {
  //   console.warn('Deleting database');
  //   return mongoose.connection.dropDatabase();
  // }

  // Start up the test server before running tests
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  // Create a test user before each test
  beforeEach(function() {
    testUser = generateUserData();

    return User.create(testUser)
      .then(() => { })
      .catch(err => {
        console.error(err);
      });
  });

  afterEach(function() {
    // return tearDownDb();
    return new Promise((resolve, reject) => {
      mongoose.connection.dropDatabase()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  });

  after(function() {
    return closeServer();
  });

  it('should return all users', function() {
    return chai.request(app)
      .get('/api/user')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body[0]).to.include.keys('id', 'firstName', 'lastName', 'username', )
      });
  });

  // it('should return a specific user', function() {
  //   // body...
  // });
  //
  // it('should create a new user', function(done) {
  //   // body...
  // });
});
