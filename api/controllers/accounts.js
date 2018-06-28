'use strict';

const sha1 = require('sha1');
const auth = require('../helpers/auth');

const Constants = require('../helpers/constants');
const User = require('../models').User;
const UserType = require('../models').UserType;
const Rank = require('../models').Rank;
const FreelancerRank = require('../models').FreelancerRank;

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
      id,
      email,
      UserType: {
        name
      }
    } = result.get({
      plain: true
    });

    if (name !== Constants.Role.Freelancer) {
      return res.json({
        token: auth.issueToken(id, email, name)
      });
    }

    FreelancerRank.findOne({
      where: {
        UserId: id
      },
      include: [
        Rank
      ]
    }).then(result => {
      const {
        Rank: {
          proposalSpace
        }
      } = result.get({
        plain: true
      });

      res.json({
        token: auth.issueToken(id, email, name, proposalSpace)
      });
    })
  }).catch(err => {
    res.status(204).send(err);
  });
}
