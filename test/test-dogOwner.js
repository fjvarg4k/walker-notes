const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY, TEST_DATABASE_URL } = require('../app/config');
const { runServer, closeServer, app } = require('../app/server');
const { User } = require('../app/user/model');
const { DogOwner } = require('../app/dogOwner/model');
const expect = chai.expect;
chai.use(chaiHttp);

describe('tests for api/owner', function() {
  let testUser, jwtToken;

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    testUser = generateUserData();

    return User.hashPassword(testUser.password)
      .then(hashedPassword => {
        return User.create({
          firstName: testUser.firstName,
          lastName: testUser.lastName,
          username: testUser.username,
          password: hashedPassword
        })
        .catch(err => {
          console.error(err);
          throw new Error(err);
        });
      })
      .then(createdUser => {
        testUser.id = createdUser.id;

        jwtToken = jsonwebtoken.sign(
          {
            user: {
              id: testUser.id,
              firstName: testUser.firstName,
              lastName: testUser.lastName,
              username: testUser.username
            }
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            expiresIn: JWT_EXPIRY,
            subject: testUser.username
          }
        );

        const seedData = [];
        for (let i = 1; i <= 10; i++) {
          const newDogOwner = generateDogOwnerData();
          newDogOwner.user = createdUser.id;
          seedData.push(newDogOwner);
        }
        return DogOwner.insertMany(seedData)
          .catch(err => {
            console.error(err);
            throw new Error(err);
          });
      });
  });

  afterEach(function() {
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
  })

  describe('POST', function() {
    it('should create a new dog owner', function() {
      let newDogOwner = generateDogOwnerData();
      return chai.request(app)
        .post('/api/owner')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(newDogOwner)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('user', 'firstName', 'lastName', 'dogNames', 'address', 'notes');
        })
    });
  });

  describe('GET', function() {
    it('should return a user\'s clients', function() {
      return chai.request(app)
        .get('/api/owner')
        .set('Authorization', `Bearer ${jwtToken}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          const dogOwner = res.body[0];
          expect(dogOwner).to.include.keys('user', 'firstName', 'lastName', 'dogNames', 'address', 'notes');
          expect(dogOwner.user).to.be.a('object');
          expect(dogOwner.user).to.include.keys('firstName', 'lastName', 'username');
        })
    });

    it('should return a specific dog owner', function() {
      let searchDogOwner;
      return DogOwner.find()
        .then(owners => {
          expect(owners).to.be.a('array');
          expect(owners).to.have.lengthOf.at.least(1);
          searchDogOwner = owners[0];

          return chai.request(app)
            .get(`/api/owner/${searchDogOwner.id}`)
            .set('Authorization', `Bearer ${jwtToken}`);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('user', 'firstName', 'lastName', 'dogNames', 'address', 'notes');
        })
    });
  });

  describe('PUT', function() {
    it('should update a dog owner\'s info', function() {
      let dogOwnerToUpdate;
      const newDogOwnerData = generateDogOwnerData();
      return DogOwner.find()
        .then(owners => {
          expect(owners).to.be.a('array');
          expect(owners).to.have.lengthOf.at.least(1);
          dogOwnerToUpdate = owners[0];

          return chai.request(app)
            .put(`/api/owner/${dogOwnerToUpdate.id}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(newDogOwnerData)
        })
        .then(res => {
          expect(res).to.have.status(204);

          return DogOwner.findById(dogOwnerToUpdate.id);
        })
        .then(owner => {
          expect(owner).to.be.a('object');
        });
    });
  });

  describe('DELETE', function() {
    it('should delete a specific dog owner\'s info', function() {
      let dogOwnerToDelete;
      return DogOwner.find()
        .then(owners => {
          expect(owners).to.be.a('array');
          expect(owners).to.have.lengthOf.at.least(1);
          dogOwnerToDelete = owners[0];

          return chai.request(app)
            .delete(`/api/owner/${dogOwnerToDelete.id}`)
            .set('Authorization', `Bearer ${jwtToken}`);
        })
        .then(res => {
          expect(res).to.have.status(204);

          return DogOwner.findById(dogOwnerToDelete.id);
        })
        .then(owner => {
          expect(owner).to.not.exist;
        });
    });
  });

  // Generates a User object
  function generateUserData() {
    return {
      firstName: `${faker.name.firstName()}`,
      lastName: `${faker.name.lastName()}`,
      username: `${faker.internet.userName()}`,
      password: `${faker.internet.password()}`
    };
  }

  // Generates a dogOwner object
  function generateDogOwnerData() {
    return {
      firstName: `${faker.name.firstName()}`,
      lastName: `${faker.name.lastName()}`,
      dogNames: `${faker.name.firstName()}`,
      address: `${faker.address.streetAddress()}`,
      notes: `${faker.lorem.paragraph()}`
    };
  }
});
