'use strict';

const JobPostStatus = require('../models').JobPostStatus;

// Exports all the functions to perform on the db
module.exports = {
  getJobPostStatus
};

// GET /jobpoststatus operationId
function getJobPostStatus(req, res) {
  JobPostStatus.findAll()
    .then(result => {
      const jobPostStatus = result.map(node => {
        const {
          id,
          description
        } = node.get({
          plain: true
        });

        return {
          id,
          description,
        };
      });

      res.json({
        jobPostStatus
      });
    })
    .catch(err => {
      res.status(204).send(err);
    });
}
