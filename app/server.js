require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const { PORT, DATABASE_URL } = require('./config');
const { authRouter } = require('./auth/router');
const { userRouter } = require('./user/router');
const { localStrategy, jwtStrategy } = require('./auth/strategy');

let server;
const app = express();

// Middleware
app.use(morgan('common'));
app.use(express.json());
app.use(express.static('../public'));

// Used when authenticating user login
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routers
app.use('/api/user/', userRouter);
app.use('/api/auth/', authRouter);

// If we make an HTTP request that is not handled by the server, we return 404 'Not Found'
app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

function runServer(databaseURL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseURL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// app.listen(process.env.PORT || 8080);

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
