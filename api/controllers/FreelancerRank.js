'use strict';

const FreelancerRank = require('../models').FreelancerRank;
const Rank = require('../models').Rank;
const User = require('../models').User;

// Exports all the functions to perform on the db
module.exports = {
  getFreelancerRank
};

// GET /freelancerrank operationId
function getFreelancerRank(req, res) {
  FreelancerRank.findAll({
    include: [
      User,
      Rank
    ]
  }).then(result => {
    const freelancerRank = result.map(node => {
      const {
        User: {
          email
        },
        Rank: {
          id,
          proposalSpace
        }
      } = node.get({
        plain: true
      });

      return {
        freelancer: email,
        rank: id,
        proposalSpace
      };
    });

    res.json({
      freelancerRank
    });
  }).catch(err => {
    res.status(204).send(err);
  });
}
