'use strict';

const sha1 = require('sha1');
const auth = require('../helpers/auth');

const User = require('../models').User;
const UserType = require('../models').UserType;

// Exports all the functions to perform on the db
module.exports = {
  login
};

// POST /accounts operationId
function login(req, res) {
  const {
    email,
    password
  } = req.body;

  User.findOne({
    where: {
      email,
      password: sha1(password)
    },
    include: [
      UserType
    ]
  }).then(result => {
    if (!result) {
      return res.status(403).send({
        message: 'Error: Credentials incorrect'
      });
    }

    const {
      email,
      UserType: {
        name
      }
    } = result.get({
      plain: true
    });

    res.json({
      token: auth.issueToken(email, name)
    });
  }).catch((err) => {
    res.status(204).send(err);
  });
}
